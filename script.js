const dataurl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"

const data = fetch(dataurl)
                .then((res) => res.json())
                .then(data => drawCahrt(data));

// const drawCahrt = (data) => {
//     const w = 1000;
//     const h = 500;
//     const padding = 50;
//     const color = d3.scaleOrdinal(d3.schemeDark2);
//     const minYear = new Date(0).setFullYear(d3.min(data, d => d.Year - 1));
//     const maxYear = new Date(0).setFullYear(d3.max(data, d => d.Year + 1));
//     const minTime = new Date("2000-01-01T00:"+ d3.min(data, d => d.Time));
//     const maxTime = new Date("2000-01-01T00:" + d3.max(data, d => d.Time));

//     const scaleYear = d3.scaleTime()
//         .domain([minYear, maxYear])
//         .range([padding, w - padding]);
//     const scaleTime = d3.scaleTime()
//         .domain([minTime, maxTime])
//         .range([padding, h - padding]);
        
//     const svg = d3.select(".scatterplot")
//         .append("svg")
//         .attr("width", w)
//         .attr("height", h);
        
//     svg.selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         .attr("cx", (d) => scaleYear(new Date(0).setFullYear(d.Year)) )
//         .attr("cy", (d) => scaleTime(new Date("2000-01-01T00:" + d.Time)))
//         .attr("r", 5)
//         .attr("class", "dot")
//         .attr("data-xvalue", d => d.Year)
//         .attr("data-yvalue", d => new Date("2000-01-01T00:" + d.Time))
//         .style("fill", d=> color(d.Doping !== ''))
//         .on("mouseover", (e, d) => {
//             e.target.style.fill = "#aaa";
//             const tooltip = d3.select("#tooltip")
//                 .attr("data-year", d.Year)
//                 .attr("data-time", d.Time)
//                 .style("visibility", "visible")
//                 .style("transform", `translateX(${e.clientX}px) translateY(${e.clientY}px)`)
//             tooltip.append("div")
//                 .text(d.Year)
//             tooltip.append("div")
//                 .text(d.Time)
//         })
//         .on("mouseout", (e,d) => {
//             e.target.style.fill = color(d.Doping !== '');
//             d3.select("#tooltip")
//                 .style("visibility", "hidden")
//                 .text("");
            
//         })
    
//     const xAxis = d3.axisBottom(scaleYear);
//     const yAxis = d3.axisLeft(scaleTime)
//         .tickFormat(d3.timeFormat("%M:%S"));
//     const xAxisLine = svg.append("g")
//         .attr("id", "x-axis")
//         .attr("transform", `translate(${0}, ${h - padding})`)
//         .call(xAxis);

//     const yAxisLine = svg.append("g")
//         .attr("id", "y-axis")
//         .attr("transform", `translate(${padding}, ${0})`)
//         .call(yAxis);
    
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

//     d3.select(".scatterplot")
//         .append("div")
//         .attr("id", "tooltip")
//         .style("visibility", "hidden");
// }