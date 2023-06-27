const margin = ({top: 10, right: 30, bottom: 30, left: 60})
const width = 300 - margin.left - margin.right
const height =200 - margin.top - margin.bottom
// const heights = [height, height, height, height]

const container = d3.select(DOM.svg(width+margin.left+margin.right,  
                                    height+margin.top*3+margin.bottom*3))

const barchart = container
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top*2 + margin.bottom*3)
  .append("g")
  .attr("transform", "translate("  + margin.left + "," + margin.bottom + ")")


//yAxis
const y = d3.scaleLinear()
  .domain([0, 75000])
  .range([ height, 10])

barchart.append("g")
  .attr("transform", `translate(${width}), 0`)
  .call(d3.axisLeft(y))
  .call(g => g.append("text")
      .attr("x", -45)
      .attr("y", 3)
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .text(`↑ Median Income ($)`))
 
barchart.append("g")
  .call(d3.axisLeft(y));

const x = d3.scaleBand()
  .range([ 0, 75 ])
  .padding(0.2);

barchart.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");


barchart
.insert('rect')
.attr('width', 40)
.attr('height', height - y(10000))
.attr('x', 20 )
.attr('y', y(10000))
.attr('fill', "#3B77AF")

const income_label = barchart
  .append('text')
  .attr('x', 25)
  .attr('y', y(10000) + 10)
  .style("font", "10px sans-serif")
  .style('fill', 'white')
  .text(`$10000`)
// .attr('stroke', 'purple')
// .attr('stroke-width', 0.5);

const title = container
  .append('text')
  .attr('x', 0)
  .attr('y', 15)
  .style("font", "14px sans-serif")
  .text(`Per Capita Median Income for testCountry_10000`)

// Add Avg Per Capita med income
const standard = barchart.append('line')
  .attr('x1',0 )
  .attr('x2', 75)
  .attr('y1', y(41276))
  .attr('y2', y(41276))
  .style("stroke", "red")
  .style("stroke-width", 1)

const standard_label = barchart.append('text')
  .attr('x', 75)
  .attr('y', y(42000))
  .style('font', '8px sans-serif')
  .style('fill', 'red')
  .text('Median Per Capita Income in CA ($41276)')