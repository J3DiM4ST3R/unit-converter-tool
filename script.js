// Conversion factors
const conversionRates = {
    length: {
        'meters': 1,
        'kilometers': 0.001,
        'miles': 0.000621371,
        'feet': 3.28084
    },
    weight: {
        'grams': 1,
        'kilograms': 0.001,
        'pounds': 0.00220462,
        'ounces': 0.035274
    },
    temperature: {
        'celsius': {
            toFahrenheit: (value) => (value * 9/5) + 32,
            toKelvin: (value) => value + 273.15
        },
        'fahrenheit': {
            toCelsius: (value) => (value - 32) * 5/9,
            toKelvin: (value) => (value - 32) * 5/9 + 273.15
        },
        'kelvin': {
            toCelsius: (value) => value - 273.15,
            toFahrenheit: (value) => (value - 273.15) * 9/5 + 32
        }
    }
};

function populateUnits() {
    const unitFromSelect = document.getElementById('unit-from');
    const unitToSelect = document.getElementById('unit-to');
    const selectedUnitType = unitFromSelect.value;

    // Clear previous options
    unitToSelect.innerHTML = '';

    // Populate units based on selected type
    if (selectedUnitType === 'length') {
        Object.keys(conversionRates.length).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            unitToSelect.appendChild(option);
        });
    } else if (selectedUnitType === 'weight') {
        Object.keys(conversionRates.weight).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            unitToSelect.appendChild(option);
        });
    } else if (selectedUnitType === 'temperature') {
        ['celsius', 'fahrenheit', 'kelvin'].forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            unitToSelect.appendChild(option);
        });
    }
}

function convertUnits() {
    const valueInput = document.getElementById('value-input');
    const unitFrom = document.getElementById('unit-from').value;
    const unitTo = document.getElementById('unit-to').value;
    const resultMessage = document.getElementById('result-message');

    const value = parseFloat(valueInput.value);
    if (isNaN(value)) {
        resultMessage.textContent = 'Please enter a valid number.';
        return;
    }

    let convertedValue;

    if (unitFrom === unitTo) {
        convertedValue = value; // No conversion needed
    } else if (unitFrom === 'length') {
        // Length conversion
        convertedValue = value * (conversionRates.length[unitTo] / conversionRates.length[unitFrom]);
    } else if (unitFrom === 'weight') {
        // Weight conversion
        convertedValue = value * (conversionRates.weight[unitTo] / conversionRates.weight[unitFrom]);
    } else if (unitFrom === 'temperature') {
        // Temperature conversion
        if (unitFrom === 'celsius') {
            if (unitTo === 'fahrenheit') {
                convertedValue = conversionRates.temperature.celsius.toFahrenheit(value);
            } else if (unitTo === 'kelvin') {
                convertedValue = conversionRates.temperature.celsius.toKelvin(value);
            }
        } else if (unitFrom === 'fahrenheit') {
            if (unitTo === 'celsius') {
                convertedValue = conversionRates.temperature.fahrenheit.toCelsius(value);
            } else if (unitTo === 'kelvin') {
                convertedValue = conversionRates.temperature.fahrenheit.toKelvin(value);
            }
        } else if (unitFrom === 'kelvin') {
            if (unitTo === 'celsius') {
                convertedValue = conversionRates.temperature.kelvin.toCelsius(value);
            } else if (unitTo === 'fahrenheit') {
                convertedValue = conversionRates.temperature.kelvin.toFahrenheit(value);
            }
        }
    }

    resultMessage.textContent = `Converted Value: ${convertedValue.toFixed(2)} ${unitTo.charAt(0).toUpperCase() + unitTo.slice(1)}`;
}

// Start populating units on page load
document.getElementById('unit-from').addEventListener('change', populateUnits);
window.onload = populateUnits;
