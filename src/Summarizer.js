const Preprocesser = require('./Preprocesser').Preprocesser;

class Summarizer{
	constructor(string_to_process, number_of_sentences){
		this.preprocesser = new Preprocesser();
		this.number_of_sentences = number_of_sentences
		this.string_to_process = string_to_process
		this.original_length = 0
		this.new_length = 0
	}

	sort_sentences(sentence_weights_list){
		sentence_weights_list.sort((a,b)=>{
			return b[0]-a[0];
		})
		return sentence_weights_list
	}

	get_shorten_percentage(){
		let self = this
		let dec = self.new_length/self.original_length
		let string_dec = String(dec)
		return string_dec.slice(2,4)+"."+string_dec.slice(4,5)+"%";
	}
	summarize_by_frequency(){
		const self = this
		const list_to_clean = self.preprocesser.paragraph_to_sentences(self.string_to_process);
		const clean_sentences = self.preprocesser.clean_sentences(list_to_clean);
		const tokenized = self.preprocesser.tokenize_sentences(clean_sentences[0]);
		this.original_length = tokenized.length
		const weighted_map = self.preprocesser.get_weights(tokenized);
		const sentence_weights_list = self.preprocesser.sentence_weights(clean_sentences[0], weighted_map);
		const sorted_sentences = self.sort_sentences(sentence_weights_list);
		let result_string = ""
		let length_count = 0
		for(var i=0; i<self.number_of_sentences; i++){
			length_count += sorted_sentences[i][1].split(" ").length
			result_string+=clean_sentences[1].get(sorted_sentences[i][1]);
		}
		this.new_length = length_count;
		return result_string
	}

	async summarize_by_rank(){
		const self = this
		const list_to_clean = self.preprocesser.paragraph_to_sentences(self.string_to_process);
		const clean_sentences = self.preprocesser.clean_sentences(list_to_clean);
		const nouns_and_adjactive_map = await self.preprocesser.nouns_and_adjectives(clean_sentences[0]);
	}
}

module.exports.Summarizer = Summarizer