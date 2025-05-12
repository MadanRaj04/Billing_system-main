function generateBill() {
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const billNo = document.getElementById("billNo").value;
  
    if (!name || !phone || !billNo) {
      alert("Please fill in all customer details.");
      return;
    }
  
    const prices = {
      bluetooth: 150,
      irSensor: 100,
      ultrasonic: 250,
      arduino: 500,
      raspberry: 1200,
      esp: 800,
      ic555: 30,
      ic741: 25,
      ic4017: 20,
    };
  
    let total = 0;
    let billItems = `Bill No: ${billNo}\nCustomer: ${name}\nPhone: ${phone}\n\nItems:\n`;
  
    for (let id in prices) {
      const qty = parseInt(document.getElementById(id).value) || 0;
      if (qty > 0) {
        const price = prices[id] * qty;
        total += price;
        billItems += `${id.toUpperCase()} x ${qty} = ₹${price}\n`;
      }
    }
  
    if (total === 0) {
      alert("No products selected!");
      return;
    }
  
    const tax = Math.round(total * 0.05); // 5% tax
    const final = total + tax;
  
    billItems += `\nTotal: ₹${total}\nTax (5%): ₹${tax}\nGrand Total: ₹${final}`;
  
    document.getElementById("billText").innerText = billItems;
  
    // Save to localStorage
    const savedBills = JSON.parse(localStorage.getItem("bills") || "[]");
    savedBills.push({
      billNo,
      customer: name,
      phone,
      total,
      tax,
      grandTotal: final,
      content: billItems,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("bills", JSON.stringify(savedBills));
  
    alert("Bill saved to localStorage!");
  }
  
  function printBill() {
    const content = document.getElementById("billText").innerText;
    if (!content.trim()) {
      alert("Nothing to print. Generate a bill first.");
      return;
    }
  
    const win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Print Bill</title></head><body>');
    win.document.write('<pre>' + content + '</pre>');
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  }
  
  function clearAll() {
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("billNo").value = "";
    const inputs = document.querySelectorAll("input[type=number]");
    inputs.forEach(input => input.value = 0);
    document.getElementById("billText").innerText = "";
  }
  