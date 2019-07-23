import Vue from 'vue';

Vue.directive('focus', {
	inserted (el) {
		const tagNames = [ 'input', 'textarea' ];
		let inputEl = tagNames.includes(el.tagName.toLowerCase())
			? el
			: el.querySelector('input, textarea');
		inputEl.focus();
	}
});

Vue.directive('permission', {
	inserted (el, binding) {
		const { value: roles } = binding;

		const currRole = getRole();

		if (!Array.isArray(roles)) {
			throw new Error(`need roles! Like v-permission="['admin', 'editor']"`);
			return;
		}

		const hasPermission = currRole.some(item => roles.includes(item));
		!hasPermission && el.parentNode && el.parentNode.removeChild(el);
	}
});


