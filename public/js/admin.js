// product.js
function deleteProduct(productId, csrfToken) {
    fetch(`/admin/delete/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken,
        "Accept": "application/json" // Set the accept header to indicate AJAX request
      }
    })
    .then(response => {
    if (response.ok) {
        if (response.status === 204) {
        location.reload(); // Reload the page after successful deletion for non-AJAX requests
        }
    } else {
        console.error("Failed to delete product");
    }
    }) 
    .catch(error => {
    console.error("An error occurred:", error);
    });
}

// product.js
function editProduct(productId) {
    fetch(`/admin/edit/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" // Set the accept header to indicate AJAX request
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch product for editing");
        }
      })
      .then(product => {
        // Handle the fetched product data, e.g., redirect to edit page
        window.location.href = `/admin/edit/${product._id}`;
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  }
  
   
  