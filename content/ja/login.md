+++
title =  "ログイン"
cdn = ["https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"]
import = ["js/login.js"]
+++

{{% blocks/lead color="primary" %}}

<h1 class="text-center display-1 mt-0 mt-md-5 pb-4">ログイン</h1>

{{% /blocks/lead %}}

{{% blocks/section type="section" color="white" %}}

使用するアカウントやメールアドレスは個人識別に使われます．他の人と同じものを共有しないでください．

<div id="firebaseui-auth-container"></div>
<div id="loader"></div>

{{% /blocks/section %}}
