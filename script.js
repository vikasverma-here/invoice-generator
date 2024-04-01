document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const printBtn = document.getElementById("printBtn");
    const itemsTable = document.getElementById("itemsTable");
    const totalAmount = document.getElementById("totalAmount");
    const gstAmount = document.getElementById("gstAmount");
    const grandTotal = document.getElementById("grandTotal");
    const gstSelect = document.getElementById("gstSelect");
  
    let total = 0;
  
    addItemBtn.addEventListener("click", function () {
      const newRow = itemsTable.insertRow(-1);
      const itemNameCell = newRow.insertCell(0);
      const quantityCell = newRow.insertCell(1);
      const priceCell = newRow.insertCell(2);
      const totalCell = newRow.insertCell(3);
  
      itemNameCell.innerHTML = '<input type="text">';
      quantityCell.innerHTML = '<input type="number">';
      priceCell.innerHTML = '<input type="number">';
      totalCell.innerHTML = '<button class="deleteItemBtn">Delete</button>';
  
      calculateTotal();
    });
  
    itemsTable.addEventListener("click", function (event) {
      if (event.target.classList.contains("deleteItemBtn")) {
        const row = event.target.closest("tr");
        row.remove();
        calculateTotal();
      }
    });
  
    gstSelect.addEventListener("change", function () {
      calculateTotal();
    });
  
    function calculateTotal() {
      total = 0;
      const rows = itemsTable.rows;
  
      for (let i = 1; i < rows.length; i++) {
        const quantity = rows[i].cells[1].querySelector("input").value;
        const price = rows[i].cells[2].querySelector("input").value;
        const itemTotal = quantity * price;
        total += itemTotal;
        rows[i].cells[3].textContent = itemTotal;
      }
  
      const selectedGst = gstSelect.value;
      const gst = (total * selectedGst) / 100;
      const grandTotalValue = total + gst;
  
      totalAmount.textContent = total;
      gstAmount.textContent = gst;
      grandTotal.textContent = grandTotalValue.toFixed(2);
    }
  
    printBtn.addEventListener("click", function () {
      window.print();
    });
  });
  