"use strict";
// 연결 리스트를 사용한 그래프 구현
// 간선
class Edge {
    constructor(data, des) {
        this.data = data;
        this.nextEdge = null;
        this.destination = des;
    }
}
// 정점
class Vertex {
    constructor(label) {
        this.label = label;
        this.wasVisited = false;
        this.edgeHead = null;
        this.nextVertex = null;
    }
}
// 그래프
class Graph2 {
    constructor() {
        this.vertexHead = null;
        this.count = 0; // 총 정점 갯수
    }
    insertVertex(label) {
        const newVertex = new Vertex(label);
        let lastVertex = this.vertexHead;
        if (lastVertex) {
            // 계속 순환 하면서 다음 vertex 가 없을 때까지
            while (lastVertex.nextVertex !== null) {
                lastVertex = lastVertex.nextVertex;
            }
            lastVertex.nextVertex = newVertex;
        }
        else {
            // vertexHead 가 없다면
            this.vertexHead = newVertex;
        }
        this.count = this.count + 1;
    }
    deleteVertex(label) {
        // 삭제 : 삭제 타겟의 다음 vertex를 삭제 타겟의 이전 vertex에 연결 시켜 주어야 한다.
        let targetVertex = this.vertexHead;
        let prevVertex = null;
        while (targetVertex && targetVertex.label !== label) {
            prevVertex = targetVertex;
            targetVertex = targetVertex.nextVertex;
        }
        if (!targetVertex)
            return false;
        if (prevVertex) {
            // 삭제 되는 이전 vertex 가 있다면 타겟 vertex의 다음 vertex를 넘긴다.
            prevVertex.nextVertex = targetVertex.nextVertex;
        }
        else {
            // 첫 vertext가 삭제 된다면
            this.vertexHead = targetVertex.nextVertex;
        }
        this.count = this.count - 1;
    }
    insertEdge(data, fromLabel, toLabel) {
        // fromLabel을 가지고 from Vertext를 찾자
        let fromVertex = this.vertexHead;
        let toVertex = this.vertexHead;
        while (fromVertex && fromVertex.label !== fromLabel) {
            fromVertex = fromVertex.nextVertex;
        }
        while (toVertex && toVertex.label !== toLabel) {
            toVertex = toVertex.nextVertex;
        }
        if (!fromVertex || !toVertex)
            return false;
        // 새로 만든 간선을 fromVertex의 마지막 edge에 추가한다.
        const newEdge = new Edge(data, toVertex);
        let lastEdge = fromVertex.edgeHead;
        if (lastEdge) {
            while (lastEdge.nextEdge !== null) {
                lastEdge = lastEdge.nextEdge;
            }
            lastEdge.nextEdge = newEdge;
        }
        else {
            // fromVertex의 edgeHead가 없다면 처음에 넣어준다.
            fromVertex.edgeHead = newEdge;
        }
    }
    deleteEdge(fromLabel, toLabel) {
        let fromVertex = this.vertexHead;
        while (fromVertex && fromVertex.label !== fromLabel) {
            fromVertex = fromVertex.nextVertex;
        }
        if (!fromVertex)
            return false;
        let targetEdge = fromVertex.edgeHead;
        let preTargetEdge = null;
        while (targetEdge !== null) {
            if (targetEdge.destination.label === toLabel)
                break;
            preTargetEdge = targetEdge;
            targetEdge = targetEdge.nextEdge;
        }
        if (!targetEdge)
            return false;
        if (preTargetEdge) {
            preTargetEdge.nextEdge = targetEdge.nextEdge;
        }
        else {
            // 삭제될 타겟팅의 이전이 없다면 첫 엣지다.
            fromVertex.edgeHead = targetEdge.nextEdge;
        }
    }
}
// const graph = new Graph();
// graph.insertVertex('A');
// graph.insertVertex('B');
// graph.insertVertex('C');
// graph.insertVertex('D');
// graph.insertVertex('E');
// graph.insertVertex('F');
// graph.insertArc(1, 'A', 'B');
// graph.insertArc(1, 'B', 'C');
// graph.insertArc(1, 'B', 'E');
// graph.insertArc(1, 'C', 'E');
// graph.insertArc(1, 'C', 'D');
// graph.insertArc(1, 'E', 'D');
// graph.insertArc(1, 'E', 'F');
