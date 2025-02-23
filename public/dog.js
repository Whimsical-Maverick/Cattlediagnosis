const symptoms = [
       'fever', 'vomiting', 'paralysis', 'reducedappetite',
       'coughing', 'dischargefromeyes', 'hyperkeratosis', 'nasaldischarge',
       'lethargy', 'sneezing', 'diarrhea', 'depression',
       'difficultyinbreathing', 'pain', 'skinsores', 'inflammation_eyes',
       'anorexia', 'seizures', 'dehydration', 'weightloss', 'bloodystool',
       'weakness', 'inflammation_mouth', 'rapidheartbeat', 'fatigue',
       'swollenbelly', 'laziness', 'anemia', 'fainting', 'reversesneezing',
       'gagging', 'lameness', 'stiffness', 'limping', 'increasedthirst',
       'increasedurination', 'excesssalivation', 'aggression',
       'foamingatmouth', 'difficultyinswallowing', 'irritable', 'pica',
       'hydrophobia', 'highlyexcitable', 'shivering', 'jaundice',
       'decreasedthirst', 'decreasedurination', 'bloodinurine', 'palegums',
       'ulcersinmouth', 'badbreath'
    ];


const form = document.getElementById('Form');

symptoms.forEach(symptom => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = symptom; // Name and value are the same
    checkbox.value = symptom;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + symptom)); // Add text after checkbox
    form.appendChild(label);
});