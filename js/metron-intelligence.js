/**
 * Metron Intelligence WhatsApp & Form Automation System
 * No WhatsApp API required - uses smart links and website forms
 * 
 * WhatsApp Business Number: +971521204324
 */

// WhatsApp Business Configuration
const WHATSAPP_NUMBER = '971521204324'; // No + prefix for wa.me links
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Track current segment for back button navigation
let currentSegment = null;

/**
 * Generate WhatsApp link with pre-filled message
 */
function getWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}?text=${encodedMessage}`;
}

/**
 * Pre-filled messages for different client segments and services
 */
const MESSAGES = {
  // Main menu options
  equityFirms: `Hello! I'm from a corporation/investment team interested in Metron Intelligence services:

• Pre-investment research
• Market intelligence
• Portfolio company research
• Investment thesis validation

Could you provide more information about packages, timeline (10-14 days), and pricing? Thank you!`,

  scalingOperations: `Hello! I'm from a scaling operations/growth stage company interested in:

• Digital transformation research
• Technology stack audits
• AI integration strategy
• Process automation research

Please share more details about your services and timeline. Thank you!`,

  founders: `Hello! I'm a founder/entrepreneur interested in Metron Intelligence:

• Business model research
• Market positioning analysis
• Go-to-market strategy
• Competitive analysis

Could you provide information about packages and pricing? Thank you!`,

  generalInquiry: `Hello! I'm interested in learning more about Metron Intelligence research and development services. Could you provide information about:

• Your research methodology
• Six deliverable formats
• Timeline (10-14 days)
• Pricing

Thank you!`,

  // Service-specific messages for forms
  preInvestment: (formData) => `Hello! I'm interested in Pre-Investment Research for ${formData.companyName || 'our portfolio company'}.

Key details:
• Investment Stage: ${formData.investmentStage || 'TBD'}
• Industry: ${formData.industry || 'TBD'}
• Timeline: ${formData.timeline || '10-14 days'}
• Budget: ${formData.budgetRange || 'To discuss'}

Please contact me to discuss next steps. Reference: ${formData.referenceNumber || 'Pending'}

Thank you!`,

  digitalTransformation: (formData) => `Hello! I'm interested in Digital Transformation Research for ${formData.companyName || 'our company'}.

Key details:
• Current Stage: ${formData.currentStage || 'TBD'}
• Transformation Goals: ${formData.goals || 'TBD'}
• Timeline: ${formData.timeline || '10-14 days'}
• Budget: ${formData.budgetRange || 'To discuss'}

Please contact me to discuss next steps. Reference: ${formData.referenceNumber || 'Pending'}

Thank you!`,

  businessModel: (formData) => `Hello! I'm interested in Business Model Research for ${formData.projectName || 'my venture'}.

Key details:
• Business Stage: ${formData.businessStage || 'TBD'}
• Industry: ${formData.industry || 'TBD'}
• Timeline: ${formData.timeline || '10-14 days'}
• Budget: ${formData.budgetRange || 'To discuss'}

Please contact me to discuss next steps. Reference: ${formData.referenceNumber || 'Pending'}

Thank you!`,
};

/**
 * Open WhatsApp with pre-filled message
 */
function openWhatsApp(message) {
  const link = getWhatsAppLink(message);
  window.open(link, '_blank');
}

/**
 * Generate reference number for submission
 * Format: REF-2026-[SEGMENT][####]
 * Example: REF-2026-E1234 (Equity Firm)
 */
function generateReferenceNumber(segment) {
  const prefix = {
    equity: 'E',
    scaling: 'S',
    founder: 'F',
    general: 'G'
  }[segment] || 'G';
  
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `REF-${year}-${prefix}${randomNum}`;
}

/**
 * Format form data as email body
 */
function formatEmailBody(formData, segment, serviceType) {
  const referenceNumber = formData.referenceNumber || generateReferenceNumber(segment);
  
  let body = `Metron Intelligence Inquiry - Reference: ${referenceNumber}\n\n`;
  body += `Service Type: ${serviceType}\n`;
  body += `Segment: ${segment}\n`;
  body += `Submitted: ${new Date().toLocaleString()}\n\n`;
  body += `=== CONTACT INFORMATION ===\n`;
  body += `Name: ${formData.contactName || formData.name || 'Not provided'}\n`;
  body += `Email: ${formData.email || 'Not provided'}\n`;
  body += `Phone: ${formData.phone || 'Not provided'}\n`;
  if (formData.companyName || formData.projectName) {
    body += `Company/Project: ${formData.companyName || formData.projectName}\n`;
  }
  if (formData.organization) {
    body += `Organization: ${formData.organization}\n`;
  }
  body += `\n=== INQUIRY DETAILS ===\n`;
  
  // Add relevant fields based on service type
  if (formData.investmentStage) body += `Investment Stage: ${formData.investmentStage}\n`;
  if (formData.businessStage) body += `Business Stage: ${formData.businessStage}\n`;
  if (formData.currentStage) body += `Current Stage: ${formData.currentStage}\n`;
  if (formData.industry) body += `Industry: ${formData.industry}\n`;
  if (formData.timeline) body += `Timeline: ${formData.timeline}\n`;
  if (formData.budgetRange) body += `Budget Range: ${formData.budgetRange}\n`;
  if (formData.businessModelType) body += `Business Model Type: ${formData.businessModelType}\n`;
  if (formData.deliverables && formData.deliverables.length > 0) {
    body += `Requested Deliverables: ${formData.deliverables.join(', ')}\n`;
  }
  if (formData.goals && formData.goals.length > 0) {
    body += `Transformation Goals: ${formData.goals.join(', ')}\n`;
  }
  if (formData.techStack) body += `Tech Stack: ${formData.techStack}\n`;
  if (formData.researchQuestions || formData.challenges) {
    body += `\nResearch Questions/Requirements:\n${formData.researchQuestions || formData.challenges}\n`;
  }
  if (formData.additionalRequirements) {
    body += `\nAdditional Requirements:\n${formData.additionalRequirements}\n`;
  }
  
  body += `\n---\nReference Number: ${referenceNumber}\n`;
  body += `Please respond within 2 hours.`;
  
  return body;
}

/**
 * Submit form data via email (mailto)
 */
function submitInquiryViaEmail(formData, segment, serviceType) {
  const email = 'doumani@metronventures.com';
  const subject = `Metron Intelligence Inquiry - ${formData.referenceNumber || generateReferenceNumber(segment)}`;
  const body = formatEmailBody(formData, segment, serviceType);
  
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  return { success: true, method: 'email' };
}

/**
 * Show form modal for specific segment/service
 */
function showFormModal(segment, serviceType) {
  // Store current segment for back button
  currentSegment = segment;
  
  // Hide all modals first
  document.querySelectorAll('.form-modal').forEach(modal => {
    modal.style.display = 'none';
  });

  // Show the requested modal
  const modalId = `modal-${segment}-${serviceType}`;
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close form modal
 */
function closeFormModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Handle form submission
 */
function handleFormSubmit(event, formData, segment, serviceType) {
  event.preventDefault();

  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Generate reference number
  const referenceNumber = generateReferenceNumber(segment);
  formData.referenceNumber = referenceNumber;
  formData.segment = segment;
  formData.serviceType = serviceType;
  formData.submittedAt = new Date().toISOString();

  // Validate required fields
  if (!formData.email) {
    alert('Please provide your email address.');
    return;
  }

  // Disable submit button
  submitButton.disabled = true;
  submitButton.textContent = 'Preparing email...';

  try {
    // Submit via email
    const result = submitInquiryViaEmail(formData, segment, serviceType);

    if (result.success) {
      // Show success message
      showSubmissionSuccess(referenceNumber, formData.email);
      
      // Reset form
      event.target.reset();
      
      // Close modal after delay
      setTimeout(() => {
        const modal = event.target.closest('.form-modal');
        if (modal) {
          closeFormModal(modal.id);
        }
      }, 5000);
    } else {
      throw new Error('Email submission failed');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('There was an error preparing your email. Please contact us directly at doumani@metronventures.com');
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

/**
 * Show submission success message
 */
function showSubmissionSuccess(referenceNumber, email) {
  // Remove any existing success messages
  const existing = document.querySelector('.submission-success');
  if (existing) existing.remove();

  const successMessage = document.createElement('div');
  successMessage.className = 'submission-success';
  successMessage.innerHTML = `
    <div class="success-content">
      <div class="success-icon">✅</div>
      <h3>Thank You!</h3>
      <p>Your inquiry has been submitted successfully.</p>
      <p class="reference-number">Reference: <strong>${referenceNumber}</strong></p>
      <p class="success-note">We'll respond within 2 hours at <strong>${email}</strong></p>
      <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: var(--space-md); padding: var(--space-sm); background: var(--off-white); border-left: 3px solid var(--accent-primary);">
        <strong>📧 Email Contact:</strong> Your email client should open automatically. If it doesn't, please send your inquiry to <a href="mailto:doumani@metronventures.com" style="color: var(--accent-primary);">doumani@metronventures.com</a> with Reference: <strong>${referenceNumber}</strong>
      </p>
      <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: var(--space-sm); padding: var(--space-sm); background: var(--off-white); border-left: 3px solid #25D366;">
        <strong>💬 WhatsApp:</strong> You can also connect via WhatsApp for direct human interaction (no automated messages). Our team will respond personally.
      </p>
      <div class="success-actions">
        <a href="https://wa.me/971521204324" 
           target="_blank" 
           class="btn btn-primary whatsapp-confirm">
          Connect via WhatsApp
        </a>
        <a href="mailto:doumani@metronventures.com?subject=Inquiry Reference: ${referenceNumber}" 
           class="btn btn-secondary">
          Send Email Manually
        </a>
        <button onclick="this.closest('.submission-success').remove()" class="btn btn-secondary">
          Close
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(successMessage);
  
  // Auto-remove after 15 seconds
  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.remove();
    }
  }, 15000);
}

/**
 * Open main menu (shows segment selection)
 */
function openMainMenu() {
  const menuModal = document.getElementById('main-menu-modal');
  if (menuModal) {
    menuModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close main menu
 */
function closeMainMenu() {
  const menuModal = document.getElementById('main-menu-modal');
  if (menuModal) {
    menuModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Handle segment selection from main menu
 */
function selectSegment(segment) {
  // Store current segment for back button
  currentSegment = segment;
  
  closeMainMenu();
  
  // Show service selection for the segment
  const serviceMenuId = `service-menu-${segment}`;
  const serviceMenu = document.getElementById(serviceMenuId);
  
  if (serviceMenu) {
    serviceMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    // If no service menu, open WhatsApp directly with segment message
    const message = MESSAGES[segment] || MESSAGES.generalInquiry;
    openWhatsApp(message);
  }
}

/**
 * Handle service type selection
 */
function selectService(segment, serviceType) {
  // Close service menu
  document.querySelectorAll('.service-menu').forEach(menu => {
    menu.style.display = 'none';
  });
  
  // Services without dedicated forms - open WhatsApp directly
  const whatsAppOnlyServices = ['portfolioAnalysis', 'thesisValidation', 'aiIntegration', 'processAutomation', 'goToMarket', 'competitiveAnalysis'];
  
  if (whatsAppOnlyServices.includes(serviceType)) {
    // Open WhatsApp directly with pre-filled message
    const segmentMessage = MESSAGES[segment] || MESSAGES.generalInquiry;
    const serviceName = serviceType.replace(/([A-Z])/g, ' $1').trim();
    const customMessage = `${segmentMessage}\n\nI'm specifically interested in: ${serviceName}. Please contact me to discuss next steps. Thank you!`;
    openWhatsApp(customMessage);
    return;
  }
  
  // Show appropriate form for services that have forms
  showFormModal(segment, serviceType);
}

/**
 * Navigate back to main menu
 */
function backToMainMenu() {
  // Hide all service menus and form modals
  document.querySelectorAll('.service-menu, .form-modal').forEach(menu => {
    menu.style.display = 'none';
  });
  
  // Show main menu
  openMainMenu();
  
  // Reset current segment
  currentSegment = null;
}

/**
 * Navigate back to service menu for current segment
 */
function backToServiceMenu() {
  if (!currentSegment) {
    // If no segment tracked, go to main menu
    backToMainMenu();
    return;
  }
  
  // Hide all form modals
  document.querySelectorAll('.form-modal').forEach(modal => {
    modal.style.display = 'none';
  });
  
  // Show service menu for current segment
  const serviceMenuId = `service-menu-${currentSegment}`;
  const serviceMenu = document.getElementById(serviceMenuId);
  
  if (serviceMenu) {
    serviceMenu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else {
    // If no service menu exists, go to main menu
    backToMainMenu();
  }
}

/**
 * Initialize - attach event listeners when DOM is ready
 */
function initMetronIntelligence() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
  } else {
    attachEventListeners();
  }
}

function attachEventListeners() {
  // Close modals when clicking outside
  document.querySelectorAll('.form-modal, .menu-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeFormModal(this.id);
        closeMainMenu();
      }
    });
  });

  // Close modals with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.form-modal, .menu-modal, .service-menu').forEach(el => {
        el.style.display = 'none';
      });
      document.body.style.overflow = '';
    }
  });
}

// Initialize when script loads
initMetronIntelligence();

/**
 * Handle Pre-Investment form submission
 */
window.handlePreInvestmentSubmit = function(event, segment, serviceType) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // Get checkboxes (deliverables)
  const deliverables = Array.from(formData.getAll('deliverables'));
  data.deliverables = deliverables;
  
  handleFormSubmit(event, data, segment, serviceType);
};

/**
 * Handle Digital Transformation form submission
 */
window.handleDigitalTransformationSubmit = function(event, segment, serviceType) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  // Get checkboxes (goals and deliverables)
  const goals = Array.from(formData.getAll('goals'));
  const deliverables = Array.from(formData.getAll('deliverables'));
  data.goals = goals;
  data.deliverables = deliverables;
  
  handleFormSubmit(event, data, segment, serviceType);
};

/**
 * Handle Business Model form submission
 */
window.handleBusinessModelSubmit = function(event, segment, serviceType) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  
  handleFormSubmit(event, data, segment, serviceType);
};

// Export for use in HTML
window.MetronIntelligence = {
  openWhatsApp,
  showFormModal,
  closeFormModal,
  handleFormSubmit,
  selectSegment,
  selectService,
  openMainMenu,
  closeMainMenu,
  backToMainMenu,
  backToServiceMenu,
  MESSAGES,
  generateReferenceNumber,
  getWhatsAppLink
};
