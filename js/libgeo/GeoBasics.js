function csinit(gslp){
    csgeo.gslp=gslp;
    
        
    svg = d3.select("body")
        .append("svg")
        .attr("width", csw)
        .attr("height", csh)
        ;
    
         
    csd3={};       
    csgeo.csnames={};
    for( var k=0; k<csgeo.gslp.length; k++ ) {
        csgeo.csnames[csgeo.gslp[k].name]=k;
    };
    
    csgeo.points=[];
    csgeo.lines=[];
    csgeo.free=[];
    csgeo.ctp=0;
    csgeo.ctf=0;
    csgeo.ctl=0;
    var m=csport.drawingstate.matrix;
    
    for( var k=0; k<csgeo.gslp.length; k++ ) {
        if(csgeo.gslp[k].kind=="P"){
            csgeo.points[csgeo.ctp]=csgeo.gslp[k];
            csgeo.ctp+=1;
        }
        if(csgeo.gslp[k].kind=="L"){
            csgeo.lines[csgeo.ctl]=csgeo.gslp[k];
            csgeo.ctl+=1;
        }
        if(csgeo.gslp[k].type=="Free"){
            
            var v=csport.from(csgeo.gslp[k].sx,csgeo.gslp[k].sy,csgeo.gslp[k].sz)
            
            gslp[k].px=v[0];
            gslp[k].py=v[1];
            gslp[k].pz=1;
            
            
            csgeo.free[csgeo.ctf]=csgeo.gslp[k];
            csgeo.ctf+=1;
        }
        
    };
    
    
    csgeo.dataset = {
nodes: csgeo.free,
nodes: [{px:0,py:0}],
edges: []
    };
    
    
    //Initialize a default force layout, using the nodes and edges in dataset
    csgeo.eventhandler = d3.layout.force()
        .nodes(csgeo.dataset.nodes)
        .links(csgeo.dataset.edges)
        .size([csw, csh])
        .linkDistance([80])
        .charge([0])
        .gravity([.000])
        .start();

    console.log(JSON.stringify(csgeo.points));

   //Create nodes as circles
    csgeo.nodes = svg.selectAll("circle")
      //  .data(csgeo.points)
        .data(csgeo.dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", 29)
        .attr("cx", 300)
        .attr("cy", 300)
        .style("fill",  "rgba(255,0,0,.1)")
        // .style("stroke", "black")
        // .style("stroke-width", 2)
        .call(csgeo.eventhandler.drag);

    csgeo.eventhandler.on("tick", function() {
        
        // csgeo.gslp[1].py=30;
        recalc();  
        csgeo.gslp[0].px=csgeo.dataset.nodes[0].px;
        csgeo.gslp[0].py=csgeo.dataset.nodes[0].py;
                                                                        
        csctx.save();
        csctx.clearRect ( 0   , 0 , csw , csh );
        evaluate(cserg);
        render();
        csctx.restore();
        
    });
    

 
}


function render(){

//    csgeo.nodes.attr("cx", function(d) { return d.x})
//    .attr("cy", function(d) { return d.y});
    
};



