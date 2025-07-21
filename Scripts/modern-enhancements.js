// Modern JavaScript enhancements
class CovidWebsiteEnhancer {
  constructor() {
    this.achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    this.progress = JSON.parse(localStorage.getItem('progress') || '{}');
    this.init();
  }

  init() {
    this.setupProgressIndicator();
    this.setupIntersectionObserver();
    this.setupAccessibility();
    this.setupTooltips();
    this.setupProgressTracking();
    this.setupAchievements();
    this.setupErrorHandling();
  }

  // Progress indicator for page scroll
  setupProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });
  }

  // Intersection Observer for animations
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          
          // Track section completion
          if (entry.target.tagName === 'SECTION') {
            this.markSectionAsViewed(entry.target.id);
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections and cards
    document.querySelectorAll('section, .content_container, .card-modern').forEach(el => {
      observer.observe(el);
    });
  }

  // Enhanced accessibility
  setupAccessibility() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('button, a, input').forEach(el => {
      if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
        const placeholder = el.getAttribute('placeholder');
        if (placeholder) {
          el.setAttribute('aria-label', placeholder);
        }
      }
    });

    // Keyboard navigation for quiz
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '4') {
        const choices = document.querySelectorAll('.choice-container');
        if (choices[e.key - 1]) {
          choices[e.key - 1].click();
        }
      }
    });

    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '10px';
    skipLink.style.left = '10px';
    skipLink.style.zIndex = '9999';
    skipLink.addEventListener('focus', () => {
      skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
      skipLink.classList.add('sr-only');
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Tooltip system
  setupTooltips() {
    // Add tooltips to medical terms
    const medicalTerms = {
      'coronavirus': 'A family of viruses that can cause illness in animals or humans',
      'covid-19': 'The disease caused by the SARS-CoV-2 coronavirus',
      'pandemic': 'A disease that has spread across multiple countries or continents',
      'symptoms': 'Physical signs that indicate illness or disease',
      'vaccine': 'A substance that helps your body fight against diseases'
    };

    Object.keys(medicalTerms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      document.body.innerHTML = document.body.innerHTML.replace(regex, 
        `<span class="tooltip" data-tooltip="${medicalTerms[term]}">$&</span>`
      );
    });
  }

  // Progress tracking system
  setupProgressTracking() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const progressContainer = document.createElement('div');
    progressContainer.className = 'section-progress';
    
    sections.forEach((section, index) => {
      const dot = document.createElement('div');
      dot.className = 'progress-dot';
      dot.setAttribute('data-section', section.id);
      
      if (this.progress[section.id]) {
        dot.classList.add('completed');
      }
      
      progressContainer.appendChild(dot);
    });

    // Insert after the first section
    if (sections[0]) {
      sections[0].parentNode.insertBefore(progressContainer, sections[0].nextSibling);
    }
  }

  markSectionAsViewed(sectionId) {
    if (!this.progress[sectionId]) {
      this.progress[sectionId] = true;
      localStorage.setItem('progress', JSON.stringify(this.progress));
      
      const dot = document.querySelector(`[data-section="${sectionId}"]`);
      if (dot) {
        dot.classList.add('completed');
      }

      // Check for achievements
      this.checkAchievements();
    }
  }

  // Achievement system
  setupAchievements() {
    this.achievementDefinitions = [
      { id: 'first_visit', name: 'Welcome!', description: 'Visited the website for the first time' },
      { id: 'learn_complete', name: 'Knowledge Seeker', description: 'Completed the Learn section' },
      { id: 'quiz_attempt', name: 'Quiz Taker', description: 'Attempted the quiz' },
      { id: 'perfect_score', name: 'COVID Defeater', description: 'Got a perfect score on the quiz' },
      { id: 'stats_explorer', name: 'Data Detective', description: 'Explored the statistics page' }
    ];

    // Award first visit achievement
    if (!this.achievements.includes('first_visit')) {
      this.unlockAchievement('first_visit');
    }
  }

  checkAchievements() {
    const completedSections = Object.keys(this.progress).length;
    const totalSections = document.querySelectorAll('section[id]').length;
    
    if (completedSections === totalSections && !this.achievements.includes('learn_complete')) {
      this.unlockAchievement('learn_complete');
    }
  }

  unlockAchievement(achievementId) {
    if (this.achievements.includes(achievementId)) return;

    this.achievements.push(achievementId);
    localStorage.setItem('achievements', JSON.stringify(this.achievements));

    const achievement = this.achievementDefinitions.find(a => a.id === achievementId);
    if (achievement) {
      this.showAchievementNotification(achievement);
    }
  }

  showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-badge';
    notification.innerHTML = `
      <span style="margin-right: 8px;">🏆</span>
      <div>
        <strong>${achievement.name}</strong>
        <div style="font-size: 0.8em; opacity: 0.8;">${achievement.description}</div>
      </div>
    `;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '300px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  // Error handling for API calls
  setupErrorHandling() {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.showErrorMessage('Something went wrong. Please try again later.');
    });

    // Override fetch to add error handling
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
      } catch (error) {
        console.error('Fetch error:', error);
        this.showErrorMessage('Unable to load data. Please check your internet connection.');
        throw error;
      }
    };
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #f44336;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      font-weight: 600;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Enhanced quiz functionality
class QuizEnhancer {
  constructor() {
    this.explanations = {
      1: "COVID-19 is caused by a virus called SARS-CoV-2, which belongs to the coronavirus family.",
      2: "COVID-19 was first identified in December 2019 in Wuhan, China.",
      3: "The virus spreads mainly through respiratory droplets when infected people cough, sneeze, or talk.",
      4: "If you feel unwell, it's important to see a doctor and avoid contact with others to prevent spread.",
      5: "COVID-19 was first detected in Wuhan, China, in late 2019.",
      6: "Good hygiene includes washing hands frequently with soap for at least 20 seconds.",
      7: "A high fever (above 38°C) is considered one of the more severe symptoms of COVID-19.",
      8: "COVID-19 spreads through droplets, not direct touch, but avoiding contact is still recommended.",
      9: "Corona means 'crown' in Latin, referring to the crown-like spikes on the virus surface.",
      10: "You can get COVID-19 more than once, so it's important to stay protected even after recovery."
    };
    this.init();
  }

  init() {
    if (window.location.pathname.includes('game.html')) {
      this.enhanceQuizGame();
    }
  }

  enhanceQuizGame() {
    // Add question counter
    const progressText = document.getElementById('progressText');
    if (progressText) {
      const counterDiv = document.createElement('div');
      counterDiv.className = 'quiz-question-counter';
      counterDiv.id = 'question-counter';
      progressText.parentNode.insertBefore(counterDiv, progressText);
    }

    // Wait for the quiz script to load, then enhance it
    setTimeout(() => {
      if (typeof window.getNewQuestion === 'function') {
        const originalGetNewQuestion = window.getNewQuestion;
        window.getNewQuestion = () => {
          originalGetNewQuestion();
          this.updateQuestionCounter();
        };
      }
    }, 100);

    // Add explanation after answer selection
    document.querySelectorAll('.choice-container').forEach(choice => {
      choice.addEventListener('click', (e) => {
        setTimeout(() => {
          this.showExplanation();
        }, 1000);
      });
    });
  }

  updateQuestionCounter() {
    const counter = document.getElementById('question-counter');
    if (counter && typeof window.questionCounter !== 'undefined') {
      counter.textContent = `Question ${window.questionCounter} of ${window.MAX_QUESTIONS}`;
    }
  }

  showExplanation() {
    if (typeof window.questionCounter === 'undefined') return;
    
    const explanation = this.explanations[window.questionCounter];
    if (!explanation) return;

    let explanationDiv = document.getElementById('quiz-explanation');
    if (!explanationDiv) {
      explanationDiv = document.createElement('div');
      explanationDiv.id = 'quiz-explanation';
      explanationDiv.className = 'quiz-explanation';
      
      const questionElement = document.getElementById('question');
      if (questionElement) {
        questionElement.parentNode.insertBefore(explanationDiv, questionElement.nextSibling);
      }
    }

    explanationDiv.innerHTML = `
      <strong>Did you know?</strong><br>
      ${explanation}
    `;
    explanationDiv.classList.add('show');

    setTimeout(() => {
      explanationDiv.classList.remove('show');
    }, 3000);
  }
}

// Statistics enhancements
class StatsEnhancer {
  constructor() {
    this.init();
  }

  init() {
    if (window.location.pathname.includes('stats.html')) {
      this.enhanceStatsPage();
    }
  }

  enhanceStatsPage() {
    // Add loading skeletons
    this.addLoadingSkeletons();
    
    // Enhance global stats display
    this.enhanceGlobalStats();
    
    // Add data visualization
    this.addCharts();
  }

  addLoadingSkeletons() {
    const globalStatsOutput = document.getElementById('global_stats_output');
    if (globalStatsOutput) {
      globalStatsOutput.innerHTML = `
        <div class="stat-card loading-skeleton" style="height: 120px; margin: 10px;"></div>
        <div class="stat-card loading-skeleton" style="height: 120px; margin: 10px;"></div>
        <div class="stat-card loading-skeleton" style="height: 120px; margin: 10px;"></div>
      `;
    }
  }

  enhanceGlobalStats() {
    // Wait for the original loadAPI to be available, then enhance it
    setTimeout(() => {
      if (typeof window.loadAPI === 'function') {
        const originalLoadAPI = window.loadAPI;
        window.loadAPI = function() {
          // Call original function first
          originalLoadAPI();
          
          // Then enhance the display after a short delay
          setTimeout(() => {
            const globalStatsOutput = document.getElementById('global_stats_output');
            if (globalStatsOutput && globalStatsOutput.innerHTML.includes('Total Confirmed:')) {
              // Only enhance if the original content is loaded
              const content = globalStatsOutput.innerHTML;
              if (!content.includes('stat-card')) {
                // Parse the existing content and enhance it
                const confirmed = content.match(/Total Confirmed: ([\d,]+)/)?.[1] || '0';
                const newConfirmed = content.match(/New Confirmed: ([\d,]+)/)?.[1] || '0';
                const recovered = content.match(/Total Recovered: ([\d,]+)/)?.[1] || '0';
                const newRecovered = content.match(/New Recovered: ([\d,]+)/)?.[1] || '0';
                const deaths = content.match(/Total Deaths: ([\d,]+)/)?.[1] || '0';
                const newDeaths = content.match(/New Deaths: ([\d,]+)/)?.[1] || '0';
                
                globalStatsOutput.innerHTML = `
                  <div class="stat-card">
                    <div class="stat-number">${confirmed}</div>
                    <div class="stat-label">Total Confirmed</div>
                    <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                      +${newConfirmed} new
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${recovered}</div>
                    <div class="stat-label">Total Recovered</div>
                    <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                      +${newRecovered} new
                    </div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${deaths}</div>
                    <div class="stat-label">Total Deaths</div>
                    <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                      +${newDeaths} new
                    </div>
                  </div>
                `;
              }
            }
          }, 1000);
        };
      }
    }, 100);
  }
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CovidWebsiteEnhancer();
  new QuizEnhancer();
  new StatsEnhancer();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}