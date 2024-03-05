//import * as bootstrap from "bootstrap";
//import { favourite } from "./index.js";

function createCarouselItem(imgSrc, imgAlt, imgId) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);

  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;

  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId);
  });

  return clone;
}

function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");

  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");

  carousel.appendChild(element);
}

function start() {
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");

  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on(
      "click",
      function () {
        if (scrollPosition < carouselWidth - cardWidth * 4) {
          scrollPosition += cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on(
      "click",
      function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          $("#carouselExampleControls .carousel-inner").animate(
            { scrollLeft: scrollPosition },
            600
          );
        }
      }
    );
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}

//----------------------------------------------

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_Sy19WLPj1hwRkJ0hpehEWv1Z2hmHvbAdq1mv4Vv76RZim25yWhZCOcmZ8v1ie71U";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
/*
async function initialLoad() {
  try {
    
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    const breeds = await response.json();
    console.log(breeds);

    const breedSelect = document.getElementById("breedSelect");

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading breeds:", error);
  }
}

initialLoad();
*/

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

// Event handler for breedSelect
/*
breedSelect.addEventListener("change", async () => {
  const breedId = breedSelect.value;
  
  clear(); // Clear the carousel
  
  try {
    // Fetch information on the selected breed
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    
    const data = await response.json();
    console.log(data)

    const carouselInner = document.querySelector("#carouselInner");
    const infoDump = document.getElementById("infoDump");
    infoDump.innerHTML = ""; // Clear the infoDump

    // Display information about the selected breed
    const breedInfo = document.createElement("div");
    breedInfo.classList.add("breed-info");
    breedInfo.innerHTML = `
      <h2>${data[0].breeds[0].name}</h2>
      <p><strong>Origin:</strong> ${data[0].breeds[0].origin}</p>
      <p><strong>Description:</strong> ${data[0].breeds[0].description}</p>
    `;
    infoDump.appendChild(breedInfo);

    // Create and append carousel items for each image of the selected breed
    data.forEach(image => {
      const carouselItem = createCarouselItem(image.url, image.breeds[0].name, image.id);
      appendCarousel(carouselItem);
    });

    start(); // Restart the carousel
  } catch (error) {
    console.error("Error fetching breed information:", error);
  }
});

*/

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

async function initialLoad() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    const breeds = response.data;
    console.log(breeds);

    const breedSelect = document.getElementById("breedSelect");

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading breeds:", error);
  }
}

initialLoad();

breedSelect.addEventListener("change", async () => {
  const breedId = breedSelect.value;
  
  clear(); // Clear the carousel
  
  try {
    // Fetch information on the selected breed
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    
    const data = response.data;
    console.log(data)

    const carouselInner = document.querySelector("#carouselInner");
    const infoDump = document.getElementById("infoDump");
    infoDump.innerHTML = ""; // Clear the infoDump

    // Display information about the selected breed
    const breedInfo = document.createElement("div");
    breedInfo.classList.add("breed-info");
    breedInfo.innerHTML = `
      <h2>${data[0].breeds[0].name}</h2>
      <p><strong>Origin:</strong> ${data[0].breeds[0].origin}</p>
      <p><strong>Description:</strong> ${data[0].breeds[0].description}</p>
    `;
    infoDump.appendChild(breedInfo);

    // Create and append carousel items for each image of the selected breed
    data.forEach(image => {
      const carouselItem = createCarouselItem(image.url, image.breeds[0].name, image.id);
      appendCarousel(carouselItem);
    });

    start(); // Restart the carousel
  } catch (error) {
    console.error("Error fetching breed information:", error);
  }
});


/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

// Done - via the scrip addded to index.html

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

  axios.interceptors.request.use(function (config) {
  config.metadata = { startTime: new Date() };
  console.log("Request started at:", config.metadata.startTime);
  document.getElementById("progressBar").style.width = "0%"; // Reset progress bar
  return config;}, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
  const elapsedTime = new Date() - response.config.metadata.startTime;
  console.log("Request completed in", elapsedTime, "milliseconds");
  return response;}, function (error) {
    return Promise.reject(error);
  });

  function updateProgress(event) {
  console.log("inside update progress function")
  console.log(event); // Log the ProgressEvent object
  const progressBar = document.getElementById("progressBar");
  console.log(progressBar);
  if (event.lengthComputable) {
    const progress = (event.loaded / event.total) * 100;
    console.log("progress :", progress)
    progressBar.style.width = progress + "%"; // Update progress bar width
  }
  }

// Add updateProgress function to onDownloadProgress config option
axios.interceptors.request.use(function (config) {
  console.log("update progress called")
  config.onDownloadProgress = updateProgress;
  return config;
}, function (error) {
  return Promise.reject(error);
});

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
// Request interceptor
axios.interceptors.request.use(function (config) {
  config.metadata = { startTime: new Date() };
  console.log("Request started at:", config.metadata.startTime);
  document.body.style.cursor = "progress"; // Setting the  cursor style to "progress"
  document.getElementById("progressBar").style.width = "0%"; // Reset progress bar
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(function (response) {
  const elapsedTime = new Date() - response.config.metadata.startTime;
  console.log("Request completed in", elapsedTime, "milliseconds");
  document.body.style.cursor = "auto"; // Remove progress cursor style
  return response;
}, function (error) {
  document.body.style.cursor = "auto"; // Remove progress cursor style on error as well
  return Promise.reject(error);
});

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

async function favourite(imageId) {
  try {
    // Check if the image is already favorited
    const isFavorited = checkIfFavorited(imageId);

    if (isFavorited) {
      // If already favorited, send a DELETE request to remove it from favorites
      await axios.delete(`https://api.thecatapi.com/v1/favourites/${isFavorited}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      console.log(`Image with ID ${imageId} removed from favorites.`);
    } else {
      // If not favorited, send a POST request to add it to favorites
      await axios.post("https://api.thecatapi.com/v1/favourites", {
        image_id: imageId,
      }, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      console.log(`Image with ID ${imageId} added to favorites.`);
    }

    // Update the UI to reflect the change in favorite status
    updateFavoriteIcon(imageId);
  } catch (error) {
    console.error("Error favoriting image:", error);
  }
}

async function checkIfFavorited(imageId) {
  try {
    // Fetch the list of favorites from the API
    const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    // Check if the image is present in the list of favorites
    const favorites = response.data;
    const favorite = favorites.find(fav => fav.image_id === imageId);
    
    // Return the favorite ID if found, otherwise return null
    return favorite ? favorite.id : null;
  } catch (error) {
    console.error("Error checking if image is favorited:", error);
    return null;
  }
}

function updateFavoriteIcon(imageId) {
  const favoriteIcon = document.querySelector(`[data-img-id="${imageId}"]`);
  if (favoriteIcon) {
    const isFavorited = checkIfFavorited(imageId);
    if (isFavorited) {
      favoriteIcon.classList.add("favorited"); // Add a class to indicate favorited state
    } else {
      favoriteIcon.classList.remove("favorited"); // Remove the class if not favorited
    }
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

async function getFavourites() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/favourites", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const favourites = response.data;
    console.log("Favourites:", favourites);

    clear(); // Clear the carousel

    // Display favourites
    favourites.forEach((favorite) => {
      if (favorite.image && favorite.image.breeds) {
        const carouselItem = createCarouselItem(favorite.image.url, favorite.image.breeds[0].name, favorite.image.id);
        appendCarousel(carouselItem);
      }
    });

    start(); // Restart the carousel
  } catch (error) {
    console.error("Error fetching favourites:", error);
  }
}

getFavouritesBtn.addEventListener("click", getFavourites);

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
