import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { CircularProgress } from '@mui/material'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const SalesChart = ({ dataset, isLoading, hasData }) => {
  // Sort data alphabetically before processing
  const sortedData = useMemo(() => {
    if (!dataset?.labels?.length) {
      return { labels: [], amounts: [], colors: [] }
    }

    const labels = dataset.labels || []
    const amounts = dataset.amounts || []
    const colors = dataset.colors || []

    // Create array of objects with label, amount, and color
    const dataWithLabels = labels.map((label, index) => ({
      label: String(label || ''),
      amount: Number(amounts[index]) || 0,
      color: colors[index] || '#cccccc',
    }))

    // Sort alphabetically by label (A → Z)
    const sorted = dataWithLabels.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    )

    return {
      labels: sorted.map(item => item.label),
      amounts: sorted.map(item => item.amount),
      colors: sorted.map(item => item.color),
    }
  }, [dataset])

  const totalAmount = useMemo(() => {
    return (sortedData?.amounts || []).reduce((sum, amount) => sum + amount, 0)
  }, [sortedData])

  const pieData = useMemo(() => {
    const labels = sortedData.labels || []
    const amounts = sortedData.amounts || []
    const colors = sortedData.colors || []

    return {
      labels,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors,
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    }
  }, [sortedData])

  const chartOptions = useMemo(
    () =>
      createPieOptions({
        totalAmount,
      }),
    [totalAmount],
  )

  const legendItems = useMemo(() => {
    if (!pieData.labels?.length) return []
    const labels = pieData.labels
    const amounts = pieData.datasets?.[0]?.data || []
    const colors = pieData.datasets?.[0]?.backgroundColor || []

    return labels.map((label, index) => {
      const amount = Number(amounts[index]) || 0
      return {
        label,
        amount,
        color: colors[index],
        percentage: computePercentage(amount, totalAmount),
      }
    })
  }, [pieData, totalAmount])

  const legendColumns = useMemo(() => {
    if (!legendItems.length) return []
    // Use 2-3 columns based on item count for better layout
    const columnCount = legendItems.length <= 6 ? 2 : 3
    const itemsPerColumn = Math.ceil(legendItems.length / columnCount)

    return Array.from({ length: columnCount }, (_, index) =>
      legendItems.slice(index * itemsPerColumn, (index + 1) * itemsPerColumn),
    ).filter(column => column.length > 0)
  }, [legendItems])

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full w-full">
      <div className="relative bg-white rounded-lg shadow-sm p-4 w-full h-[360px] transition-opacity duration-300">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
            <CircularProgress size={28} thickness={5} />
          </div>
        )}
        {hasData ? (
          <Pie data={pieData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data available for the selected filters
          </div>
        )}
      </div>
      <hr className="w-full border-t border-gray-200" />
      {legendColumns.length > 0 && (
        <div className="w-full mt-4 px-4">
          <div className="chart-legend">
            {legendColumns.map((column, columnIndex) => (
              <div key={`legend-column-${columnIndex}`} className="chart-legend__column">
                {column.map(item => (
                  <div key={item.label} className="chart-legend__item">
                    <span
                      className="chart-legend__indicator"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="chart-legend__content">
                      <span className="chart-legend__label">{item.label}</span>
                      <span className="chart-legend__value">
                        ₹{item.amount.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{' '}
                        ({item.percentage})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const createPieOptions = ({ totalAmount }) => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 500,
    easing: 'easeInOutQuad',
  },
  animations: {
    numbers: {
      type: 'number',
      easing: 'easeOutQuad',
      duration: 500,
    },
    animateRotate: {
      duration: 500,
    },
    animateScale: {
      duration: 500,
    },
  },
  plugins: {
    title: {
      display: false,
      font: {
        size: 16,
        weight: 'bold',
      },
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: context => {
          const amount = context.raw || 0
          return `₹${amount.toLocaleString('en-IN')} (${computePercentage(
            amount,
            totalAmount,
          )})`
        },
      },
    },
  },
})

const computePercentage = (value, total) => {
  if (!total) return '0%'
  return `${((Number(value || 0) / total) * 100).toFixed(1)}%`
}

export default SalesChart