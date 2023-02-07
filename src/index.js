import './index.css';
import axios from 'axios';

const refreshBtn = document.querySelector('.refresh-btn');
const inputForm = document.querySelector('.form');
const personName = document.getElementById('name');
const personScore = document.getElementById('score');
const scoresContainer = document.querySelector('.scores');
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/31xZs3rPDDVy8KxlirLR/scores/';
// get request
const displayItems = (items) => {
  const itemList = items
    .map((item) => {
      const { score, user } = item;
      return `<li><span>${user}</span> ${score}</li>`;
    })
    .join('');
  scoresContainer.innerHTML = itemList;
};
const getScores = async () => {
  try {
    const {
      data: { result },
    } = await axios(baseUrl);
    displayItems(result);
  } catch (error) {
    throw new Error(error.response.data);
  }
};
refreshBtn.addEventListener('click', getScores);
// post request
inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!personName.value || !personScore.value) return;
  try {
    await axios.post(baseUrl, {
      user: `${personName.value}`,
      score: `${personScore.value}`,
    });
  } catch (error) {
    throw new Error(error.response.data);
  }
  personName.value = '';
  personScore.value = '';
});
// onload
window.addEventListener('DOMContentLoaded', getScores);
