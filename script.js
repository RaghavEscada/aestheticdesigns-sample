document.addEventListener("DOMContentLoaded", () => {

    function populateGallery() {
        const imageContainers = document.querySelectorAll(".images");

        if (imageContainers.length === 0) {
            console.error("No elements found with class 'images'. Check your HTML structure.");
            return;
        }

        // The ranges for each project:
        const projectRanges = [
            { start: 1, end: 3 },   // Project 1: images 1 to 3
            { start: 4, end: 6 },   // Project 2: images 4 to 6
            { start: 7, end: 12 },  // Project 3: images 7 to 12
        ];

        imageContainers.forEach((container, index) => {
            const { start, end } = projectRanges[index];

            // Loop through the range of images for each project
            for (let i = start; i <= end; i++) {
                const imgContainer = document.createElement("div");
                imgContainer.classList.add("img");

                const img = document.createElement("img");
                img.src = `./images/${i}.jpg`; // Correct path to the images folder
                img.alt = `Project Image ${i}`;
                console.log(`Adding image: ${img.src}`);

                imgContainer.appendChild(img);
                container.appendChild(imgContainer);
            }
        });
    }

    populateGallery();

    // ScrollTrigger for progress bar
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            gsap.set(".progress-bar", {
                scaleY: self.progress,
            });
        },
    });

    const previewImg = document.querySelector(".preview-img img");
    const imgElements = document.querySelectorAll(".img img");

    imgElements.forEach((img) => {
        ScrollTrigger.create({
            trigger: img,
            start: "top 50%",  // Trigger when the image comes into view
            end: "bottom 50%",
            onEnter: () => (previewImg.src = img.src),   // Update preview image when this image enters view
            onEnterBack: () => (previewImg.src = img.src),  // Update preview image when scrolling back
        });
    });

    // Indicator logic
    const indicator = document.querySelector(".indicator");
    const projectSections = document.querySelectorAll(".project");

    // Create ScrollTrigger for each project section
    projectSections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",  // When the top of the section reaches the center of the viewport
            end: "bottom center", // When the bottom of the section reaches the center of the viewport
            onEnter: () => {
                // Shift the indicator to the corresponding project
                updateIndicatorPosition(index);
            },
            onEnterBack: () => {
                // Shift the indicator back when scrolling back
                updateIndicatorPosition(index);
            },
        });
    });

    // Function to update the indicator position based on the current project
    function updateIndicatorPosition(projectIndex) {
        const projectNames = document.querySelectorAll(".name");
        
        // Reset all indicators to inactive
        projectNames.forEach((name) => name.classList.remove("active"));
        
        // Set the corresponding project to active
        projectNames[projectIndex].classList.add("active");

        // Update indicator position
        const projectName = projectNames[projectIndex];
        gsap.to(indicator, {
            y: projectName.offsetTop - indicator.offsetHeight / 2, // Adjust the indicator's vertical position
            duration: 0.5,
            ease: "power2.out",
        });
    }

});
