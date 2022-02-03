+++
title = "アカウント"
linkTitle = "アカウント"
type = "docs"
import = ["js/profile.js"]
+++

<div id="user-form" class="mb-4">
    <form onsubmit="infoSubmit(); return false;" class="needs-validation">
        <div class="form-group row">
          <div class="col-sm-3">メールアドレス</div>
          <div class="col-sm-9 user-email"></div>
        </div>
        <div class="form-group was-validated row">
            <label for="input-user-displayName" class="col-sm-3 col-form-label">表示名</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="input-user-displayName" data-key="displayName" aria-describedby="input-user-displayName-help">
            </div>
        </div>
        <button disabled id="update-info" type="submit" class="btn btn-primary">更新する</button>
        <div id="success" class="text-success d-inline-block" style="opacity: 0;"><i class="fas fa-check-circle fa-fw"></i>更新完了</div>
      </form>
</div>
