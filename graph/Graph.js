"use strict";
class Graph {
    constructor(v) {
        this.vertices = v;
        this.edges = 0;
        this.adj = new Array(v);
        for (let i = 0; i < this.adj.length; i++) {
            this.adj[i] = [""];
        }
    }
    addEdge(v, w) {
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }
    showGraph() {
        console.log("this.adj", this.adj);
        this.adj.forEach((verticeList, index) => {
            console.log(`${index} -> `);
            verticeList.forEach((vertice) => {
                if (vertice !== undefined) {
                    console.log(`${vertice}`);
                }
            });
            console.log("\n");
        });
    }
}
