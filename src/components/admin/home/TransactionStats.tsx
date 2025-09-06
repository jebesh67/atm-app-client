"use client";

import { useAllTransactions } from "@/hooks/useAllTransactions";
import { Bar, Doughnut } from "react-chartjs-2";
import "@/lib/chartSetup";
import dayjs from "dayjs";
import { Chart } from "chart.js";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const TransactionStats = () => {
  const {data: transactions} = useAllTransactions();
  
  if (!transactions || transactions.length === 0) {
    return <p>No transactions yet</p>;
  }
  
  const dates = [
    ...new Set(transactions.map((t) => dayjs(t.date).format("DD MMM YYYY"))),
  ];
  
  const deposits = dates.map((date) =>
    transactions
      .filter(
        (t) =>
          dayjs(t.date).format("DD MMM YYYY") === date && t.type === "deposit",
      )
      .reduce((sum, t) => sum + t.amount, 0),
  );
  
  const withdrawals = dates.map((date) =>
    transactions
      .filter(
        (t) =>
          dayjs(t.date).format("DD MMM YYYY") === date &&
          t.type === "withdrawal",
      )
      .reduce((sum, t) => sum + t.amount, 0),
  );
  
  const totalDeposits = deposits.reduce((a, b) => a + b, 0);
  const totalWithdrawals = withdrawals.reduce((a, b) => a + b, 0);
  
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Deposits",
        data: deposits,
        backgroundColor: "rgba(75,192,192,0.6)",
      },
      {
        label: "Withdrawals",
        data: withdrawals,
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          padding: 10,
        },
        title: {
          display: false,
        },
      },
      
      title: {
        display: true,
        text: "Transactions",
        padding: {
          top: 0,
          bottom: 0,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: import("chart.js").TooltipItem<"bar">) =>
            `${ context.dataset.label }: ${ formatCurrency(context.parsed.y) }`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) =>
            typeof value === "number" ? formatCurrency(value) : value,
        },
      },
    },
    animation: {
      onComplete: (ctx) => {
        const chart = ctx.chart;
        const {ctx: canvasCtx} = chart;
        
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index] as number;
            if (value > 0) {
              canvasCtx.save();
              canvasCtx.font = "bold 12px sans-serif";
              canvasCtx.fillStyle = "#000";
              canvasCtx.textAlign = "center";
              canvasCtx.fillText(formatCurrency(value), bar.x, bar.y - 5);
              canvasCtx.restore();
            }
          });
        });
      },
    },
  } satisfies import("chart.js").ChartOptions<"bar">;
  
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: Chart) {
      const {width, height, ctx} = chart;
      ctx.save();
      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.fillText(
        `Deposits: ${ formatCurrency(totalDeposits) }`,
        width / 2,
        height / 2 - 10,
      );
      
      ctx.fillText(
        `Withdrawals: ${ formatCurrency(totalWithdrawals) }`,
        width / 2,
        height / 2 + 10,
      );
      
      ctx.restore();
    },
  };
  
  const doughnutData = {
    labels: ["Deposits", "Withdrawals"],
    datasets: [
      {
        data: [totalDeposits, totalWithdrawals],
        backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  };
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {position: "bottom" as const},
      title: {
        display: true,
        text: "Total Deposits vs Withdrawals",
      },
      tooltip: {
        callbacks: {
          label: (context: import("chart.js").TooltipItem<"doughnut">) =>
            `${ context.label }: ${ formatCurrency(context.parsed) }`,
        },
      },
    },
  } satisfies import("chart.js").ChartOptions<"doughnut">;
  
  return (
    <div className="pt-20 px-2 grid grid-cols-1 gap-2 min-w-screen md:grid-cols-2 max-w-full">
      <div
        className="flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 col-span-1 rounded-md shadow-sm md:h-[350px] p-1">
        <div className="w-full h-[270px] md:h-full">
          <Bar
            data={ data }
            options={ {...options, maintainAspectRatio: false} }
          />
        </div>
      </div>
      
      <div
        className="flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 col-span-1 rounded-md shadow-sm md:h-[350px] p-1">
        <div className="w-full h-[350px] md:h-full">
          <Doughnut
            data={ doughnutData }
            options={ {...doughnutOptions, maintainAspectRatio: false} }
            plugins={ [centerTextPlugin] }
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionStats;
