"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { insuranceData } from "@/lib/data-dec"

interface FollowersChartProps {
  data: typeof insuranceData
  onBankClick: (bank: (typeof insuranceData)[0]) => void
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { bank, followers } = payload[0].payload
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-2">
        <p className="text-slate-100 font-semibold">{bank.company_name}</p>
        <p className="text-pink-400">Obunachilar soni: {followers.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export function FollowersChart({ data, onBankClick }: FollowersChartProps) {
  const topBanks = data.sort((a, b) => b.followers - a.followers).slice(0, 10)

  const chartData = topBanks.map((bank, index) => ({
    name: (index + 1).toString(),
    followers: bank.followers,
    bank,
  }))

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          {/* Instagram Gradient */}
          <defs>
            <linearGradient id="instagramGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="25%" stopColor="#DD2A7B" />
              <stop offset="60%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(221, 42, 123, 0.1)" }}
          />

          <Bar
            dataKey="followers"
            fill="url(#instagramGradient)"
            onClick={(data) => onBankClick(data.bank)}
            cursor="pointer"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
