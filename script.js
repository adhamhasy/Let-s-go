// Function to generate a random 8-digit unique code
function generateUniqueCode(existingCodes) {
    let code;
    do {
        // Generate a random number between 10000000 and 99999999
        // This ensures the code is 8 digits long and numbers-only
        code = Math.floor(10000000 + Math.random() * 90000000).toString();
    } while (existingCodes.includes(code)); // Ensure the code is unique
    return code;
}

// Function to generate a simple username (Client-side)
function generateUsername(name) {
    const namePart = name.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '');
    const randomPart = Math.floor(Math.random() * 9000) + 1000; 
    return namePart + randomPart;
}

function handleSubscription(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const planInput = form.querySelector('input[name="plan"]:checked'); 
    const nameInput = form.querySelector('#name').value;
    const emailInput = form.querySelector('#email').value;

    // --- Local Validation Check ---
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');
    
    if (!planInput || !nameInput || !emailInput) {
        if (messageBox && messageText) { 
            messageBox.classList.remove('hidden', 'opacity-0', 'bg-success');
            messageBox.classList.add('bg-error');
            messageText.textContent = 'Please fill out all fields and select a plan.';
            setTimeout(() => messageBox.classList.remove('opacity-0'), 10);
            setTimeout(() => messageBox.classList.add('hidden', 'opacity-0'), 5000);
        }
        return; 
    }

    // Determine subscription duration in days
    let durationDays;
    if (planInput.value.includes('30 Days')) {
        durationDays = 30;
    } else { // 12 Days Journey
        durationDays = 12;
    }
    
    // --- 1. Data Generation and Collection ---
    let subscriptions = JSON.parse(localStorage.getItem('gymSubscriptions')) || [];
    const existingCodes = subscriptions.map(sub => sub.code);
    
    // Generates a unique 8-digit numerical subscription code
    const subscriptionCode = generateUniqueCode(existingCodes); 
    
    const username = generateUsername(nameInput);
    
    const newSubscription = {
        id: Date.now(), 
        name: nameInput,
        email: emailInput,
        plan: planInput.value,
        code: subscriptionCode, // Numbers only
        username: username,
        date: new Date().toLocaleDateString('en-US'),
        startDate: Date.now(),
        duration: durationDays, 
        isPaid: false 
    };

    // --- 2. Store Data ---
    subscriptions.push(newSubscription);
    localStorage.setItem('gymSubscriptions', JSON.stringify(subscriptions));
    localStorage.setItem('currentSubscriptionCode', subscriptionCode);
    
    // --- 3. Redirect ---
    window.location.href = `success.html`;
}
