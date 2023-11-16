
// =========================================== click on district ==================
const drawMap = async () => {
    try {
        const response = await fetch('districts.geojson');
        const data = await response.json();

        const svg = d3.select('#map')
            .append('svg')
            .attr('width', 1200)
            .attr('height', 700);

        const projection = d3.geoMercator()
            .center([90.3563, 23.685])
            .scale(7000)
            .translate([400, 380]);

        const path = d3.geoPath()
            .projection(projection);

        svg.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('class', 'district')
            .style('fill', '#ccc')
            .style('stroke', '#fff')
            .style('stroke-width', 0.5)
            .on('mouseover', function (d) {
                d3.select(this)
                    .style('fill', '#99ff99')
                    .style('transform', 'scale(1.02)');
                const randomData = Math.floor(Math.random() * 100);
                const districtName = d.target.__data__.properties.ADM2_EN;
                tooltip.html(`<strong>${districtName}</strong><br>Event: ${randomData}`)
                    .style('visibility', 'visible');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .style('fill', '#ccc')
                    .style('transform', 'scale(1)');
                tooltip.style('visibility', 'hidden');
            })
            .on('click', function (d) {
                const districtName = d.target.__data__.properties.ADM2_EN;
                const loremIpsumData = `Our Meeting will held on ${districtName}`; // Replace this with your data

                d3.select('#sidebar')
                    .html(`<h2>${districtName}</h2><p>${loremIpsumData}</p><br><img src="https://d2mvzyuse3lwjc.cloudfront.net/doc/en/UserGuide/images/2D_B_and_W_Pie_Chart/2D_B_W_Pie_Chart_1.png?v=83139">`);
            });
        // Display district names
        svg.selectAll('text')
            .data(data.features)
            .enter()
            .append('text')
            .attr('x', d => path.centroid(d)[0])
            .attr('y', d => path.centroid(d)[1])
            .text(d => d.properties.ADM2_EN)
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'central')
            .attr('font-size', '10px')
            .attr('fill', 'black');

        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background-color', 'white')
            .style('border', '1px solid black')
            .style('padding', '5px');
        // ... (remaining code for displaying district names, tooltip, etc.)
    } catch (error) {
        console.log(error);
    }
};

drawMap();
