// 导航栏右侧功能图标处理
function initNavFunctions() {
  // 音乐播放器功能
  const musicButton = document.getElementById('music-button');
  if (musicButton) {
    musicButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('音乐播放器被点击');
    });
  }

  // 深色模式切换功能 - 导航栏按钮（恢复正确ID）
  const darkmodeButton = document.getElementById('darkmode-button');
  if (darkmodeButton) {
    darkmodeButton.addEventListener('click', function(e) {
      e.preventDefault();
      // 调用主题内置的深色模式切换函数
      const willChangeMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (willChangeMode === 'dark') {
        btf.activateDarkMode();
        if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.Snackbar) {
          btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        }
      } else {
        btf.activateLightMode();
        if (typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.Snackbar) {
          btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
        }
      }
      btf.saveToLocal.set('theme', willChangeMode, 2);
      // 更新导航栏按钮图标
      updateNavDarkmodeIcon(willChangeMode);
    });
  }

  // 收藏功能
  const favoritesButton = document.getElementById('favorites-button');
  if (favoritesButton) {
    favoritesButton.addEventListener('click', function(e) {
      console.log('收藏页面被点击');
    });
  }

  // 相册功能  
  const galleryButton = document.getElementById('gallery-button');
  if (galleryButton) {
    galleryButton.addEventListener('click', function(e) {
      console.log('相册页面被点击');
    });
  }

  // 初始化导航栏暗色模式图标
  updateNavDarkmodeIcon();
}

// 更新导航栏暗色模式按钮图标
function updateNavDarkmodeIcon(theme) {
  const darkmodeBtn = document.getElementById('darkmode-button');
  if (darkmodeBtn) {
    const icon = darkmodeBtn.querySelector('i');
    if (icon) {
      const currentTheme = theme || document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  }
}

// DOM加载完成时初始化
document.addEventListener('DOMContentLoaded', initNavFunctions);

// PJAX支持 - 页面切换后重新初始化导航栏按钮
if (window.btf && window.btf.addGlobalFn) {
  btf.addGlobalFn('pjaxComplete', function() {
    // 延迟执行，确保DOM已更新
    setTimeout(initNavFunctions, 100);
  }, 'navFunctionsReInit');
}

// 监听主题变化，更新导航栏图标（不干扰右侧栏）
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      updateNavDarkmodeIcon();
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
}); 