<template>
<div class="layout">
	<slot name="header">
		<Header></Header>
	</slot>
	<slot></slot>
</div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
	data() {
		return {}
	},
	components: {
		Header,
		Footer
	}
}
</script>
