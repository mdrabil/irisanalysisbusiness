
    
      feather.replace();

      // Handle Video Confirmation
      document.querySelectorAll("input[name='watched']").forEach(radio => {
        radio.addEventListener("change", function() {
          const formFields = document.getElementById("formFields");
          const videoWarning = document.getElementById("videoWarning");

          if (this.value === "Yes") {
            formFields.classList.remove("hidden");
            setTimeout(() => formFields.classList.remove("opacity-0"), 50);
            videoWarning.classList.add("hidden");
          } else {
            formFields.classList.add("opacity-0");
            setTimeout(() => formFields.classList.add("hidden"), 500);
            videoWarning.classList.remove("hidden");
          }
        });
      });

      // ✅ Google Apps Script Submit
      const scriptURL = "https://script.google.com/macros/s/AKfycby8QyoaZrueoPRCgi8c8LHjEj_7IFEBhKMVqPyGTR1tSo453r3Gp-SBjVidnpEmA_GF/exec";

      document.getElementById("applicationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("loader").classList.remove("hidden");

        const data = {
          watched: document.querySelector("input[name='watched']:checked")?.value || "",
          fullName: document.querySelector("input[placeholder='Full Name']").value,
          contactNumber: document.querySelector("input[placeholder='Contact Number']").value,
          email: document.querySelector("input[placeholder='Email Id']").value,
          city: document.querySelector("input[placeholder='City']").value,
          state: document.querySelector("input[placeholder='State']").value,
          country: document.querySelector("input[placeholder='Country']").value,
          qualification: document.querySelector("input[name='qualification']:checked")?.value || "",
          age: document.querySelector("input[placeholder='Enter your age']").value,
          profession: document.querySelector("input[name='profession']:checked")?.value || "",
          funds: document.querySelector("input[name='funds']:checked")?.value || "",
          pointA: document.querySelector("input[placeholder='Point a']").value,
          pointB: document.querySelector("input[placeholder='Point b']").value,
          pointC: document.querySelector("input[placeholder='Point c']").value
        };

        if (!data.watched || data.watched.toLowerCase() === "no") {
          alert("❌ Please watch the complete video before applying.");
          document.getElementById("loader").classList.add("hidden");
          return;
        }

        let requiredFields = ["fullName","contactNumber","email","city","state","country","qualification","age","profession","funds"];
        for (let key of requiredFields) {
          if (!data[key]) {
            alert(`Please fill in the ${key} field`);
            document.getElementById("loader").classList.add("hidden");
            return;
          }
        }

        if (!data.pointA) delete data.pointA;
        if (!data.pointB) delete data.pointB;
        if (!data.pointC) delete data.pointC;

        fetch(scriptURL, { method: "POST", body: JSON.stringify(data) })
        .then(res => res.json())
        .then(res => {
          if (res.result === "success") {
            window.location.href = "thankyou.html?name=" + encodeURIComponent(data.fullName);
          } else {
            alert("Something went wrong. Try again!");
            document.getElementById("loader").classList.add("hidden");
          }
        })
        .catch(err => {
          console.error("Error:", err);
          alert("Error submitting form!");
          document.getElementById("loader").classList.add("hidden");
        });
      });
    