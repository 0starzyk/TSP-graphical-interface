const container = document.querySelector('.container');
const totalDistance = document.querySelector('.distance-box');
const screen = document.querySelector('.screen');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 1000 x 600
const coordinates = [[200, 300], [800, 400], [700, 100], [500, 500]];
const allCities = alphabet.slice(0, coordinates.length);
const links = 'ACDB';

function linkLength(first, second)
{
    return Math.sqrt((second[0] - first[0]) ** 2 + (second[1] - first[1]) ** 2);
}

function linkAngle(first, second)
{
    let result = Math.atan((second[1] - first[1]) / (second[0] - first[0])) * (180 / Math.PI);
    if (second[0] < first[0] && second[1] < first[1])
        result += 180;
    else if (second[0] < first[0] && second[1] > first[1])
        result += 180;
    
    return result;
}

for (let i = 0; i < coordinates.length; i++)
{
    const newCity = document.createElement('div');

    newCity.classList.add('city');
    newCity.style.left = `${coordinates[i][0]}px`;
    newCity.style.bottom = `${coordinates[i][1]}px`;
    newCity.textContent = `${allCities[i]}(${coordinates[i][0]},${coordinates[i][1]})`;

    screen.appendChild(newCity);
}

let totalLength = 0;

for (let i = 0; i < links.length - 1; i++)
{
    const firstCity = coordinates[alphabet.indexOf(links[i])];
    const secondCity = coordinates[alphabet.indexOf(links[i + 1])];
    const angle = linkAngle(firstCity, secondCity);
    const link = document.createElement('div');

    link.classList.add('link');
    totalLength += linkLength(firstCity, secondCity);
    link.style.width = `${linkLength(firstCity, secondCity)}px`;
    link.style.transform = `rotate(${-angle}deg)`;
    link.style.left = `${firstCity[0] + 25}px`;
    link.style.bottom = `${firstCity[1] + 25}px`;

    screen.appendChild(link);
}

totalDistance.textContent = `Total distance: ${totalLength}`;
