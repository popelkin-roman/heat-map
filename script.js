const dataurl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

const data = fetch(dataurl)
                .then((res) => res.json())
                .then(data => drawCahrt(data));

const drawCahrt = (data) => {
    const w = 1000;
    const h = 500;
    const paddingX = 60;
    const paddingY = 40;
    const width = 5;
    const height = (h-2*paddingY) / 12;
    const baseTemp = data.baseTemperature;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const color = d3.scaleSequential(d3.interpolateTurbo);
    let currentCellColor = '';
    const minYear = new Date(data.monthlyVariance[0].year, data.monthlyVariance[0].month);
    const maxYear = new Date(
      data.monthlyVariance[data.monthlyVariance.length - 1].year,
      data.monthlyVariance[data.monthlyVariance.length - 1].month);
    const minTemp = d3.min(data.monthlyVariance, d=>d.variance);
    const maxTemp = d3.max(data.monthlyVariance, d=>d.variance);
    console.log(minTemp,maxTemp);
    const scaleYear = d3.scaleTime()
        .domain([minYear, maxYear])
        .range([paddingX, w - paddingX]);
    const scaleMonth = d3.scaleBand()
        .domain(months)
        .range([paddingY, h - paddingY]);
        
    const svg = d3.select(".heatmap")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
        
    svg.selectAll("rect")
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("x", (d) => scaleYear(new Date(d.year, 0, 1)) )
        .attr("y", (d) => paddingY + (d.month -1)*height)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "cell")
        .attr("data-year", d => d.year)
        .attr("data-month", d =>  d.month-1)
        .attr("data-temp", d => (baseTemp + d.variance).toFixed(2))
        .style("fill", d=> color((d.variance - minTemp)/(maxTemp-minTemp)))
        .on("mouseover", (e, d) => {
          currentCellColor = e.target.style.fill;
            e.target.style.fill = "#aaa";
            const tooltip = d3.select("#tooltip")
                .attr("data-year", d.year)
                .attr("data-month", d.month)
                .attr("data-temp", d.variance)
                .style("visibility", "visible")
                .style("transform", `translateX(${e.clientX}px) translateY(${e.clientY}px)`)
            tooltip.append("div")
                .text(d.year)
            tooltip.append("div")
                .text(months[d.month-1])
            tooltip.append("div")
                .text( (baseTemp + d.variance).toFixed(2) + " ℃")
        })
        .on("mouseout", (e) => {
            e.target.style.fill = currentCellColor;
            d3.select("#tooltip")
                .style("visibility", "hidden")
                .text("");
            
        })
    
    const xAxis = d3.axisBottom(scaleYear);
    const yAxis = d3.axisLeft(scaleMonth);
    const xAxisLine = svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${0}, ${h - paddingY})`)
        .call(xAxis);

    const yAxisLine = svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${paddingX}, ${0})`)
        .call(yAxis);
    
//     const legendContainer = svg.append('g').attr('id', 'legend');

//     const legend = legendContainer
//           .selectAll('#legend')
//           .data(color.domain())
//           .enter()
//           .append('g')
//           .attr('class', 'legend-label')
//           .attr('transform', function (d, i) {
//             return 'translate(0,' + (h / 2 - i * 20) + ')';
//           });
    
//         legend
//           .append('rect')
//           .attr('x', w - 18)
//           .attr('width', 18)
//           .attr('height', 18)
//           .style('fill', color);
    
//         legend
//           .append('text')
//           .attr('x', w - 24)
//           .attr('y', 9)
//           .attr('dy', '.35em')
//           .style('text-anchor', 'end')
//           .text(function (d) {
//             if (d) {
//               return 'Riders with doping allegations';
//             } else {
//               return 'No doping allegations';
//             }
//           });

    d3.select(".heatmap")
        .append("div")
        .attr("id", "tooltip")
        .style("visibility", "hidden");
}