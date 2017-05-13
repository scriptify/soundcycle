var baseEffect = Object.create(null, {

	connect: {
		enumerable: true,

		value: function(audioNode) {
			this.output.connect(audioNode);
			return this;
		}
	},

	disconnect: {
		enumerable: true,

		value: function(audioNode) {
			this.output.disconnect(audioNode);
			return this;
		}
	}
});

export default baseEffect;
