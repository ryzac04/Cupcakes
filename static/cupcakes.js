const BASE_URL = "http://127.0.0.1:5000/api"

// HTML rendered with given cupcake data
function cupcakeHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <ul class="mt-2">
                 <b>Flavor: ${cupcake.flavor} | Size: ${cupcake.size} | Rating: ${cupcake.rating}/10</b>
                <button class="delete btn btn-danger"><b>X</button>
            </ul>
            <img class="cupcake-img" src="${cupcake.image}" alt="${cupcake.flavor} flavored cupcake"
        </div>
    `;
}

// render cupcakes to page
async function showCupcakes() {
    const resp = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeInfo of resp.data.cupcakes) {
        let newCupcake = $(cupcakeHTML(cupcakeInfo));
        $("#cupcake-list").append(newCupcake);
    }
}

// handle form to add new cupcakes to list

$("#cupcake-form").on("submit", async function (e) {
    e.preventDefault();

    let flavor = $("#cupcake-flavor").val();
    let size = $("#cupcake-size").val();
    let rating = $("#cupcake-rating").val();
    let image = $("#cupcake-image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, { flavor, size, rating, image })
    
    let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#cupcake-form").trigger("reset");
});

$("#cupcake-list").on("click", ".delete", async function (e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
})

$(showCupcakes);