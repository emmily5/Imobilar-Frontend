// Multi-step Form Logic for IMOBILAR Property Listing
class PropertyForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.selectedFiles = [];
        this.maxFiles = 10;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgressBar();
        this.setupFileUpload();
    }
    
    bindEvents() {
        // Navigation buttons
        document.getElementById('nextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevStep());
        
        // Form submission
        document.getElementById('propertyForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // File input change
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));
        
        // CEP input formatting and validation
        const cepInput = document.querySelector('input[name="cep"]');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => this.formatCEP(e));
            cepInput.addEventListener('blur', (e) => this.validateCEP(e));
        }
        
        // Phone input formatting
        const phoneInput = document.querySelector('input[name="ownerPhone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhone(e));
        }
        
        // Price input formatting
        const priceInput = document.querySelector('input[name="price"]');
        if (priceInput) {
            priceInput.addEventListener('input', (e) => this.formatPrice(e));
        }
    }
    
    setupFileUpload() {
        const uploadArea = document.querySelector('.file-upload-area');
        
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = Array.from(e.dataTransfer.files).filter(file => 
                file.type.startsWith('image/')
            );
            
            this.addFiles(files);
        });
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStep();
            } else {
                this.submitForm();
            }
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    }
    
    updateStep() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        document.querySelector(`.form-step[data-step="${this.currentStep}"]`).classList.add('active');
        
        // Update progress bar
        this.updateProgressBar();
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Scroll to top of form
        document.querySelector('.search-card').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    updateProgressBar() {
        const progressSteps = document.querySelectorAll('.progress-step');
        const progressLine = document.getElementById('progressLine');
        
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
        
        // Update progress line width
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        const maxWidth = progressSteps[progressSteps.length - 1].offsetLeft - progressSteps[0].offsetLeft;
        progressLine.style.width = `${(progressPercentage / 100) * maxWidth}px`;
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Show/hide previous button
        if (this.currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        // Update next button text
        if (this.currentStep === this.totalSteps) {
            nextBtn.innerHTML = `
                Publicar Anúncio
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
            `;
        } else {
            nextBtn.innerHTML = `
                Avançar
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12,5 19,12 12,19"/>
                </svg>
            `;
        }
    }
    
    validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.field-error').forEach(field => {
            field.classList.remove('field-error');
        });
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                field.classList.add('field-error');
                isValid = false;
            }
        });
        
        // Additional validations for specific steps
        if (this.currentStep === 1) {
            // Check if operation is selected
            const operationSelected = document.querySelector('input[name="operation"]:checked');
            if (!operationSelected) {
                const radioGroup = document.querySelector('.radio-group');
                radioGroup.style.border = '2px solid var(--accent)';
                radioGroup.style.borderRadius = 'var(--radius)';
                radioGroup.style.padding = '0.5rem';
                isValid = false;
                
                setTimeout(() => {
                    radioGroup.style.border = '';
                    radioGroup.style.padding = '';
                }, 3000);
            }
        }
        
        if (this.currentStep === 4) {
            // Check if terms are accepted
            const termsAccepted = document.querySelector('input[name="terms"]:checked');
            if (!termsAccepted) {
                const termsCheckbox = document.querySelector('input[name="terms"]');
                termsCheckbox.parentElement.style.border = '2px solid var(--accent)';
                termsCheckbox.parentElement.style.borderRadius = 'var(--radius)';
                termsCheckbox.parentElement.style.padding = '0.5rem';
                isValid = false;
                
                setTimeout(() => {
                    termsCheckbox.parentElement.style.border = '';
                    termsCheckbox.parentElement.style.padding = '';
                }, 3000);
            }
        }
        
        if (!isValid) {
            // Show error message
            this.showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    }
    
    validateField(field) {
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(field.value);
        }
        
        if (field.name === 'cep') {
            const cepRegex = /^\d{5}-?\d{3}$/;
            return cepRegex.test(field.value);
        }
        
        if (field.name === 'ownerPhone') {
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            return phoneRegex.test(field.value);
        }
        
        if (field.type === 'number') {
            const value = parseFloat(field.value);
            return !isNaN(value) && value > 0;
        }
        
        return field.value.trim() !== '';
    }
    
    handleFileSelect(event) {
        const files = Array.from(event.target.files);
        this.addFiles(files);
    }
    
    addFiles(files) {
        const remainingSlots = this.maxFiles - this.selectedFiles.length;
        const filesToAdd = files.slice(0, remainingSlots);
        
        filesToAdd.forEach(file => {
            if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) { // 5MB limit
                this.selectedFiles.push(file);
                this.createImagePreview(file);
            }
        });
        
        if (files.length > remainingSlots) {
            this.showErrorMessage(`Máximo de ${this.maxFiles} fotos permitidas.`);
        }
    }
    
    createImagePreview(file) {
        const preview = document.getElementById('imagePreview');
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="preview-remove" onclick="propertyForm.removeImage(${this.selectedFiles.length - 1})">
                    ×
                </button>
            `;
            
            preview.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    }
    
    removeImage(index) {
        this.selectedFiles.splice(index, 1);
        this.updateImagePreview();
    }
    
    updateImagePreview() {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';
        
        this.selectedFiles.forEach((file, index) => {
            this.createImagePreview(file);
        });
    }
    
    formatCEP(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length > 5) {
            value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        
        event.target.value = value;
    }
    
    async validateCEP(event) {
        const cep = event.target.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    // Auto-fill address fields
                    document.querySelector('input[name="address"]').value = data.logradouro || '';
                    document.querySelector('input[name="neighborhood"]').value = data.bairro || '';
                    document.querySelector('input[name="city"]').value = data.localidade || '';
                    
                    // Set state if it exists in the select options
                    const stateSelect = document.querySelector('select[name="state"]');
                    const stateOption = Array.from(stateSelect.options).find(
                        option => option.value === data.uf
                    );
                    if (stateOption) {
                        stateSelect.value = data.uf;
                    }
                } else {
                    this.showErrorMessage('CEP não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    }
    
    formatPhone(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d+)/, '($1) $2');
        }
        
        event.target.value = value;
    }
    
    formatPrice(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value) {
            // Convert to number and format with thousands separator
            const numValue = parseInt(value);
            event.target.value = numValue.toLocaleString('pt-BR');
        }
    }
    
    showErrorMessage(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                background: var(--accent);
                color: var(--text-white);
                padding: 1rem;
                border-radius: var(--radius);
                margin-bottom: 1rem;
                text-align: center;
                font-weight: 600;
            `;
            
            const form = document.getElementById('propertyForm');
            form.insertBefore(errorDiv, form.firstChild);
        }
        
        errorDiv.textContent = message;
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            background: var(--primary);
            color: var(--text-white);
            padding: 2rem;
            border-radius: var(--radius);
            text-align: center;
            font-weight: 600;
            font-size: 1.1rem;
            margin: 2rem 0;
            box-shadow: var(--shadow-card);
        `;
        successDiv.innerHTML = `
            <svg style="width: 3rem; height: 3rem; margin-bottom: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            <div>${message}</div>
            <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
                Redirecionando para a página inicial em <span id="countdown">5</span> segundos...
            </div>
        `;
        
        const formContainer = document.querySelector('.search-card');
        formContainer.innerHTML = '';
        formContainer.appendChild(successDiv);
        
        // Countdown and redirect
        let seconds = 5;
        const countdownElement = document.getElementById('countdown');
        const countdown = setInterval(() => {
            seconds--;
            if (countdownElement) {
                countdownElement.textContent = seconds;
            }
            
            if (seconds <= 0) {
                clearInterval(countdown);
                window.location.href = 'index.html';
            }
        }, 1000);
    }
    
    async submitForm() {
        const formData = new FormData(document.getElementById('propertyForm'));
        
        // Add selected files to form data
        this.selectedFiles.forEach((file, index) => {
            formData.append(`photo_${index}`, file);
        });
        
        // Get selected amenities
        const amenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
            .map(checkbox => checkbox.value);
        formData.set('amenities', JSON.stringify(amenities));
        
        // For demo purposes, we'll just show a success message
        // In a real application, you would send this data to your backend
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show loading state
            const nextBtn = document.getElementById('nextBtn');
            const originalText = nextBtn.innerHTML;
            nextBtn.innerHTML = `
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                Publicando...
            `;
            nextBtn.disabled = true;
            
            setTimeout(() => {
                this.showSuccessMessage('Seu anúncio foi publicado com sucesso!');
            }, 2000);
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            this.showErrorMessage('Erro ao publicar anúncio. Tente novamente.');
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        // Form submission is handled by nextStep() method
    }
}

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.propertyForm = new PropertyForm();
});

// Utility functions for animations (matching the existing script.js style)
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.search-card, .form-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

    document.getElementById('propertyForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Coleta as comodidades marcadas
    const amenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked'))
                           .map(el => el.value);

    const formData = {
        title: document.querySelector('input[name="title"]').value,
        propertyType: document.querySelector('select[name="propertyType"]').value,
        operation: document.querySelector('input[name="operation"]:checked').value,
        price: document.querySelector('input[name="price"]').value,
        description: document.querySelector('textarea[name="description"]').value,
        cep: document.querySelector('input[name="cep"]').value,
        city: document.querySelector('input[name="city"]').value,
        // ... adicione os demais campos conforme o DTO
        amenities: amenities,
        idAnunciante: 1 // Temporário: id do usuário logado
    };

    const response = await fetch('http://localhost:8080/api/imoveis/anunciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert('Parabéns! Seu imóvel está anunciado.');
        window.location.href = 'index.html';
    }
});
// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);