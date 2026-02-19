/**
 * Backend Warmer Service
 * Keeps the Render backend server warm by sending random pings
 * to prevent cold starts and ensure instant form submissions
 */

class BackendWarmer {
  private intervalId: NodeJS.Timeout | null = null;
  private isActive: boolean = false;
  private baseUrl: string;
  
  // Array of random endpoints to rotate through
  private endpoints = [
    '/api/ping',
    '/api/status', 
    '/api/wake',
    '/api/heartbeat',
    '/api/alive',
    '/api/monitor'
  ];
  
  // Array of POST endpoints for variety
  private postEndpoints = [
    '/api/ping',
    '/api/keep-alive'
  ];

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  /**
   * Generate random data to send with POST requests
   */
  private generateRandomPayload() {
    const randomActions = [
      'portfolio_view',
      'page_interaction', 
      'navigation_click',
      'scroll_event',
      'component_mount',
      'user_activity',
      'animation_trigger',
      'section_view'
    ];

    return {
      action: randomActions[Math.floor(Math.random() * randomActions.length)],
      timestamp: Date.now(),
      sessionId: Math.random().toString(36).substring(7),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      userAgent: navigator.userAgent.substring(0, 50), // Truncated for privacy
      randomData: Math.random().toString(36).substring(2, 15),
      counter: Math.floor(Math.random() * 1000)
    };
  }

  /**
   * Send a single ping to a random endpoint
   */
  private async sendPing(): Promise<boolean> {
    try {
      const usePost = Math.random() > 0.7; // 30% chance to use POST
      
      if (usePost) {
        // Send POST request with random data
        const endpoint = this.postEndpoints[Math.floor(Math.random() * this.postEndpoints.length)];
        const payload = this.generateRandomPayload();
        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        return response.ok;
      } else {
        // Send GET request
        const endpoint = this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'GET'
        });
        
        return response.ok;
      }
    } catch (error) {
      console.debug('Backend ping failed (this is normal if server is starting):', error);
      return false;
    }
  }

  /**
   * Start the warming service
   * Sends initial ping immediately, then continues at random intervals
   */
  public async start(): Promise<void> {
    if (this.isActive) {
      console.debug('Backend warmer is already active');
      return;
    }

    console.debug('Starting backend warmer service...');
    this.isActive = true;

    // Send initial ping immediately
    await this.sendPing();

    // Start the interval pinging
    this.scheduleNextPing();
  }

  /**
   * Schedule the next ping at a random interval (10-15 minutes)
   */
  private scheduleNextPing(): void {
    if (!this.isActive) return;

    // Random interval between 10-15 minutes (600000-900000 ms)
    const minInterval = 10 * 60 * 1000; // 10 minutes
    const maxInterval = 15 * 60 * 1000; // 15 minutes
    const randomInterval = Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

    console.debug(`Next backend ping scheduled in ${Math.round(randomInterval / 60000)} minutes`);

    this.intervalId = setTimeout(async () => {
      if (this.isActive) {
        await this.sendPing();
        this.scheduleNextPing(); // Schedule the next ping
      }
    }, randomInterval);
  }

  /**
   * Stop the warming service
   */
  public stop(): void {
    console.debug('Stopping backend warmer service...');
    this.isActive = false;
    
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Check if the service is currently active
   */
  public getStatus(): { active: boolean; baseUrl: string } {
    return {
      active: this.isActive,
      baseUrl: this.baseUrl
    };
  }

  /**
   * Send an immediate ping (useful for form submissions)
   */
  public async pingNow(): Promise<boolean> {
    return await this.sendPing();
  }
}

// Create a singleton instance
const backendWarmer = new BackendWarmer();

export default backendWarmer;

// Also export the class for testing purposes
export { BackendWarmer };
