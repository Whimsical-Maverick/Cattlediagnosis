import { useState, useRef } from "react";

const Cattle = () => {
    const symptoms = [
        'anorexia', 'abdominal_pain', 'anaemia', 'abortions', 'acetone',
        'aggression', 'arthrogyposis', 'ankylosis', 'anxiety', 'bellowing',
        'blood_loss', 'blood_poisoning', 'blisters', 'colic',
        'Condemnation_of_livers', 'conjunctivae', 'coughing', 'depression',
        'discomfort', 'dyspnea', 'dysentery', 'diarrhoea', 'dehydration',
        'drooling', 'dull', 'decreased_fertility', 'diffculty_breath',
        'emaciation', 'encephalitis', 'fever', 'facial_paralysis',
        'frothing_of_mouth', 'frothing', 'gaseous_stomach', 'highly_diarrhoea',
        'high_pulse_rate', 'high_temp', 'high_proportion', 'hyperaemia',
        'hydrocephalus', 'isolation_from_herd', 'infertility',
        'intermittent_fever', 'jaundice', 'ketosis', 'loss_of_appetite',
        'lameness', 'lack_of-coordination', 'lethargy', 'lacrimation',
        'milk_flakes', 'milk_watery', 'milk_clots', 'mild_diarrhoea', 'moaning',
        'mucosal_lesions', 'milk_fever', 'nausea', 'nasel_discharges', 'oedema',
        'pain', 'painful_tongue', 'pneumonia', 'photo_sensitization',
        'quivering_lips', 'reduction_milk_vields', 'rapid_breathing',
        'rumenstasis', 'reduced_rumination', 'reduced_fertility', 'reduced_fat',
        'reduces_feed_intake', 'raised_breathing', 'stomach_pain', 'salivation',
        'stillbirths', 'shallow_breathing', 'swollen_pharyngeal', 'swelling',
        'saliva', 'swollen_tongue', 'tachycardia', 'torticollis',
        'udder_swelling', 'udder_heat', 'udder_hardeness', 'udder_redness',
        'udder_pain', 'unwillingness_to_move', 'ulcers', 'vomiting',
        'weight_loss', 'weakness'
    ];

    const [data, setData] = useState(symptoms.reduce((acc, symptom) => {
        acc[symptom] = 0;
        return acc;
    }, {}));

    const [pre, setPre] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const topRef = useRef(null);

    const handleChange = (symptom) => {
        setData(prevData => ({
            ...prevData,
            [symptom]: prevData[symptom] === 1 ? 0 : 1
        }));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const handleSubmit = async () => {
        setLoading(true);
        topRef.current.scrollIntoView({ behavior: "smooth" });

        try {
            const value = Object.values(data);
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: value })
            });
            const res = await response.json();
            setPre(res.prediction);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cattle">
            <div ref={topRef}></div>
            <h2 className="cattle-title">🔍 Analyzing Symptoms with AI</h2>

            {pre.length > 0 && (
                <div className="cattle-predict">
                    <h2 className="cattle-title">🧠 AI Prediction</h2>
                    {pre.map((value, index) => (
                        <p key={index}>{value}</p>
                    ))}
                </div>
            )}

            <input type="text" placeholder="Search Symptom..." onChange={handleSearch} className="cattle-search" value={search} />

            <div className="cattle-grid">
                {symptoms
                    .filter(symptom => symptom.toLowerCase().includes(search))
                    .map((symptom, index) => (
                        <label key={index} className="cattle-label">
                            {symptom}
                            <input
                                type="checkbox"
                                className="cattle-check"
                                checked={data[symptom] === 1}
                                onChange={() => handleChange(symptom)}
                            />
                        </label>
                    ))}
            </div>

            <button onClick={handleSubmit} className="cattle-analyze">
                Analyze 🩺
            </button>

            {loading && (
                <div className="cattle-loader">
                    <div className="cattle-load"></div>
                </div>
            )}
        </div>
    );
};

export default Cattle;
