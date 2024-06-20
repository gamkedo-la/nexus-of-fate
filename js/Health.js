const maxHealth = 100;

class Health {
  constructor() {
    this.currentHealth = maxHealth;
  }

  takeDamage() {
    this.currentHealth--;
  }

  getHealth() {  
    return this.currentHealth;
  }
}