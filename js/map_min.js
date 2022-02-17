const width = window.innerWidth - 50;
const height = window.innerHeight - 50;

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

const svg = d3.select('div#map').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg-content")
    .attr("viewbox", `0 0 ${width} ${height}`)

// load and display the World
const g = svg.append("g");
d3.json("../data/world-lowres.geo.json").then((topology) => {
    const features = topology.features
    projection = projection.fitSize([width, height], topology)
    path = d3.geoPath().projection(projection);
    g.selectAll("path")
        .data(features)
        .join((enter) => {
            enter.append("path")
                .attr("d", path)
                .attr("title", d => d.properties.name)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("width", width)
                .attr("height", height)
        },
            (update) => update,
            (exit) => exit.remove()


        );

});

