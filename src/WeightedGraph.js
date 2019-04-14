class Vertex{
	constructor(value){
		this.value = value;
		this.adjacent = new Map();
	}
}

class WeightedGraph{
	constructor(){
		this.vertices_map = new Map();
		this.size = 0;
	}

	add_vertex(value){
		this.size+=1;
		let vertex_to_add = new Vertex(value);
		this.vertices_map.set(value, vertex_to_add);
		return vertex_to_add;
	}

	get_vertex(value){
		if (this.vertices_map.has(value)){
			return this.vertices_map.get(value);
		}
		return 
	}

	add_edge(a, b, weight){
		if (!this.vertices_map.has(a)){
			this.add_vertex(a);
		}
		if (!this.vertices_map.has(b)){
			this.add_vertex(b);
		}
		this.vertices_map.get(a).adjacent.set(b, weight);
		this.vertices_map.get(b).adjacent.set(a, weight);
	}
}

module.exports.WeightedGraph = WeightedGraph;