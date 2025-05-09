const categories = document.querySelectorAll('.category');
const subcategories = document.querySelectorAll('.subcategory-container');
const projectContainer = document.getElementById('projects');
const projectTitle = document.getElementById('project-title');
const projectList = document.getElementById('project-list');
const categorySection = document.getElementById('category-section');

const projectData = {
  'Modelování': [
    { title: 'Škoda 1203', model: 'modely/1203.glb', description: 'Vertices: 26 102' },
    { title: 'Škoda 120', model: 'modely/skoda120.glb', description: 'Vertices: 31 020' },
    { title: 'Robot', image: 'img/robot.jpg' }
  ],
  'Automobily': [
    { title: 'Škoda 1203', model: 'modely/1203.glb', description: 'Mesh: 1000' },
    { title: 'Škoda 120', model: 'modely/skoda120.glb', description: 'Mesh: 1000' }
  ],
  'Postavy': [
    { title: 'Robot', image: 'img/robot.jpg' }
  ],
  'Prostředí': [
    { title: 'Robot', image: 'img/robot.jpg' }
  ],
  'Scény': [
    { title: 'Robot', image: 'img/robot.jpg' }
  ],
  'Render': [
    { title: 'Rytíř v hradu', image: 'assets/Dungeon.png' }
  ],
  'Animace': [
    { title: 'Letící dron', image: 'img/drone.jpg' }
  ],
  'Informační weby': [
    { title: 'Vzdělávací portál', image: 'img/portret1.jpg' },
    { title: 'Herní mód', image: 'img/portret2.jpg' }
  ],
  'Interaktivní aplikace': [
    { title: 'Osobní rozpočet', image: 'img/krajina1.jpg' }
  ],
  'Prototypy': [
    { title: 'Fyzika auta', image: 'img/mesto1.jpg' }
  ],
  'Hry': [
    { title: 'Smíchovan', image: 'img/mesto1.jpg' }
  ]
};

categories.forEach(category => {
  category.addEventListener('click', () => {
    const cat = category.dataset.category;
    const subcat = document.getElementById(`subcategory-${cat}`);

    subcategories.forEach(sc => sc.style.display = 'none');
    categories.forEach(c => c.classList.remove('active'));
    categorySection.style.display = 'none';
    projectContainer.style.display = 'none';

    setTimeout(() => {
      subcat.style.display = 'flex';
      category.classList.add('active');
    }, 0);
  });
});

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.subcategory-container').style.display = 'none';
    categorySection.style.display = 'flex';
    categories.forEach(c => c.classList.remove('active'));
    projectList.style.display = 'flex';
  });
});

document.querySelectorAll('.subcategory').forEach(sub => {
  sub.addEventListener('click', () => {
    const subName = sub.dataset.sub;
    const items = projectData[subName] || [];

    projectTitle.textContent = subName;
    projectList.innerHTML = '';

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'project-item';

      const title = document.createElement('div');
      title.textContent = item.title;
      div.appendChild(title);

      if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        div.appendChild(img);
      } else if (item.model) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        const modelViewer = document.createElement('model-viewer');
        modelViewer.setAttribute('src', item.model);
        modelViewer.setAttribute('alt', item.title);
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('ar', '');
        modelViewer.style.width = '200px';
        modelViewer.style.height = '200px';

        wrapper.appendChild(modelViewer);

        if (item.description) {
          const desc = document.createElement('p');
          desc.textContent = item.description;
          desc.style.fontSize = '0.9em';
          desc.style.marginTop = '5px';
          wrapper.appendChild(desc);
        }

        const zoomBtn = document.createElement('button');
        zoomBtn.textContent = '🔍';
        Object.assign(zoomBtn.style, {
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          padding: '5px 10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        });

        zoomBtn.addEventListener('click', () => {
          document.querySelectorAll('.category-container, .subcategory-container, #projects').forEach(el => el.style.maxWidth = 'none');

          const fullscreenWrapper = document.createElement('div');
          Object.assign(fullscreenWrapper.style, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          });

          const fullscreenViewer = modelViewer.cloneNode();
          fullscreenViewer.style.width = '100%';
          fullscreenViewer.style.height = '100%';

          const closeBtn = document.createElement('button');
          closeBtn.textContent = '✖';
          Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '100px',
            right: '20px',
            zIndex: 1000,
            fontSize: '20px',
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          });

          closeBtn.addEventListener('click', () => {
            fullscreenWrapper.remove();
            document.querySelectorAll('.category-container, .subcategory-container, #projects').forEach(el => el.style.maxWidth = '400px');
          });

          fullscreenWrapper.append(fullscreenViewer, closeBtn);
          projectContainer.appendChild(fullscreenWrapper);
        });

        wrapper.appendChild(zoomBtn);
        div.appendChild(wrapper);
      }

      projectList.appendChild(div);
    });

    sub.closest('.subcategory-container').style.display = 'none';
    projectContainer.style.display = 'flex';
  });
});

document.querySelector('.back').addEventListener('click', () => {
  projectContainer.style.display = 'none';
  projectList.style.display = 'flex';

  [
    sekceModely, sekceModelyBack, vsechnyModely,
    auta, postavy, prostredi, sceny
  ].forEach(el => el.style.display = 'none');

  categories.forEach(cat => {
    if (cat.classList.contains('active')) {
      const catName = cat.dataset.category;
      document.getElementById(`subcategory-${catName}`).style.display = 'flex';
    }
  });
});

const sekceModely = document.getElementById("sekce-modely");
const sekceModelyBack = document.getElementById("sekce-modely-back");
const vsechnyModely = document.getElementById("vsechny-modely");
const auta = document.getElementById("Auta");
const postavy = document.getElementById("Postavy");
const prostredi = document.getElementById("Prostredi");
const sceny = document.getElementById("Sceny");

const toggleSekceModely = (show) => {
  const display = show ? "flex" : "none";
  vsechnyModely.style.display = display;
  auta.style.display = display;
  postavy.style.display = display;
  prostredi.style.display = display;
  sceny.style.display = display;
  sekceModely.style.display = show ? "none" : "flex";
  sekceModelyBack.style.display = show ? "flex" : "none";
  projectList.style.display = show ? "none" : "flex";
};

document.getElementById("Modelovani").addEventListener("click", () => sekceModely.style.display = "flex");
sekceModely.addEventListener("click", () => toggleSekceModely(true));
sekceModelyBack.addEventListener("click", () => toggleSekceModely(false));

[vsechnyModely, auta, postavy, prostredi, sceny].forEach(btn => {
  btn.addEventListener("click", () => {
    toggleSekceModely(false);
    projectList.style.display = "flex";
  });
});
