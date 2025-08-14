import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend
} from 'chart.js';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const productTypes = ['Mobiles', 'Laptops', 'Headphones', 'Earbuds', 'Charger', 'Powerbanks', 'Fans', 'Speakers', 'Smartwatches'];

function FeedbackChart({ feedbackData }) {
  const [selectedProduct, setSelectedProduct] = useState('Mobiles');

  const filtered = feedbackData.filter(f => f.product === selectedProduct);
  const ratingsCount = [0, 0, 0, 0, 0];
  const sentimentCount = { 'Loved it': 0, "It's okay": 0, "Didn't like it": 0 };

  filtered.forEach(f => {
    ratingsCount[f.rating - 1]++;
    sentimentCount[f.sentiment]++;
  });

  const ratingData = {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    datasets: [{
      label: `${selectedProduct} Ratings`,
      data: ratingsCount,
      backgroundColor: 'rgba(54, 162, 235, 0.7)'
    }]
  };

  const sentimentData = {
    labels: ['Loved it 💖', 'It\'s okay 🙂', 'Didn\'t like it 😞'],
    datasets: [{
      label: 'Sentiment',
      data: [sentimentCount['Loved it'], sentimentCount["It's okay"], sentimentCount["Didn't like it"]],
      backgroundColor: ['#4caf50', '#ffc107', '#f44336']
    }]
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto' }}>
      <h2>📊 Feedback Chart for: {selectedProduct}</h2>

      <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct}>
        {productTypes.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <Bar data={ratingData} />
      <h3 style={{ marginTop: '30px' }}>🧠 Sentiment Distribution</h3>
      <Pie data={sentimentData} />
    </div>
  );
}

export default FeedbackChart;
