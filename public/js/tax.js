let taxSwitch = document.getElementById("switchCheckDefault");
        taxSwitch.addEventListener("change", () => {
            let prices = document.querySelectorAll(".card-text p");
            prices.forEach((price) => {
                let val = price.innerText;
                val = val.replace(/[^0-9]/g, '');
                val = parseInt(val);
                if (taxSwitch.checked) {
                    val = val + Math.round(val * 0.18);
                } else {
                    val = Math.round(val / 1.18);
                }
                price.innerText = `₹${val.toLocaleString("en-IN")} /night`;
            })
        }) 