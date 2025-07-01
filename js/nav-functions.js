// 导航栏右侧功能图标处理
document.addEventListener('DOMContentLoaded', function() {
  
  // 音乐播放器功能
  const musicButton = document.getElementById('music-button');
  if (musicButton) {
    musicButton.addEventListener('click', function(e) {
      e.preventDefault();
      // 这里可以添加音乐播放器的逻辑
      // 例如：显示/隐藏音乐播放器面板
      console.log('音乐播放器被点击');
      // 可以添加 Aplayer 或其他音乐播放器的显示/隐藏逻辑
    });
  }

  // 深色模式切换功能
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
      // 更新图标
      const icon = darkmodeButton.querySelector('i');
      if (willChangeMode === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    });
  }

  // 收藏功能
  const favoritesButton = document.getElementById('favorites-button');
  if (favoritesButton) {
    favoritesButton.addEventListener('click', function(e) {
      // 如果页面不存在，可以显示提示
      console.log('收藏页面被点击');
    });
  }

  // 相册功能  
  const galleryButton = document.getElementById('gallery-button');
  if (galleryButton) {
    galleryButton.addEventListener('click', function(e) {
      // 如果页面不存在，可以显示提示
      console.log('相册页面被点击');
    });
  }

  // 初始化深色模式图标
  const initDarkmodeIcon = () => {
    const darkmodeBtn = document.getElementById('darkmode-button');
    if (darkmodeBtn) {
      const icon = darkmodeBtn.querySelector('i');
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
    }
  };

  // 页面加载时初始化图标
  initDarkmodeIcon();
  
  // 监听主题变化
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        initDarkmodeIcon();
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}); 