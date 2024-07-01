


function checkSwaggerChanges() {
    const oldSwagger = localStorage.getItem('oldSwaggerData');
    const newSwagger = localStorage.getItem('swaggerData');
  
    if (!newSwagger) {
      console.error('New Swagger data is not available.');
      return false;
    }
  
    if (!oldSwagger) {
      localStorage.setItem('oldSwaggerData', newSwagger);
      return false;
    }
  
    if (oldSwagger !== newSwagger) {
      console.error('Swagger files have changed. Please update the frontend accordingly.');
      localStorage.setItem('oldSwaggerData', newSwagger);
      return true;
    }
  
    return false;
  }
  
  checkSwaggerChanges();
  