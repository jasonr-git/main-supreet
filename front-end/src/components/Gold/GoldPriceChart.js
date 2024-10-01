import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const GoldPriceChart = () => {
    const [goldPrice, setGoldPrice] = useState(null);

    useEffect(() => {
        // Mock gold price data for demonstration
        const mockGoldData = [1200, 1220, 1240, 1260, 1280, 1300];
        setGoldPrice(mockGoldData);

        // Initialize chart
        const ctx = document.getElementById('gold-price-chart');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Gold Price',
                    data: mockGoldData,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    tension: 0.4,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <div className="gold-price-container">
            <div className="gold-price-card">
                {goldPrice && (
                    <>
                        <h2>Gold Price</h2>
                        <div className="chart-container">
                            <canvas id="gold-price-chart" width="400" height="200"></canvas>
                        </div>
                        <div className="details">
                            <p>Current Price: {goldPrice[goldPrice.length - 1]}</p>
                            {/* Add more details like historical data, trends, etc. */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GoldPriceChart;
