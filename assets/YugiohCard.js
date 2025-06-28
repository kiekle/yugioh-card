import { onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import { YugiohCard } from 'yugioh-card';
import yugiohDemo from '@/assets/demo/yugioh-demo';

export const card = ref(null);
export const cardLeaf = shallowRef(null);
export const fileInput = ref(null);

export const defaultForm = {
  language: 'sc',
  font: '',
  name: '',
  color: '',
  align: 'left',
  gradient: false,
  gradientColor1: '#999999',
  gradientColor2: '#ffffff',
  type: 'monster',
  attribute: 'dark',
  icon: '',
  image: '',
  cardType: 'normal',
  pendulumType: 'normal-pendulum',
  level: 0,
  rank: 0,
  pendulumScale: 0,
  pendulumDescription: '',
  monsterType: '',
  atkBar: true,
  atk: 0,
  def: 0,
  arrowList: [],
  description: '',
  firstLineCompress: false,
  descriptionAlign: false,
  descriptionZoom: 1,
  descriptionWeight: 0,
  package: '',
  password: '',
  copyright: '',
  laser: '',
  rare: '',
  twentieth: false,
  radius: true,
  scale: 1,
};

export const form = reactive({ ...defaultForm, ...yugiohDemo });

export function renderCard() {
  cardLeaf.value?.leafer.destroy();
  cardLeaf.value = new YugiohCard({
    view: card.value,
    data: { ...form },
    resourcePath: process.env.NODE_ENV === 'production'
      ? 'https://static.ygosgs.com'
      : 'src/assets/yugioh-card',
  });
}

export function exportImage() {
  cardLeaf.value.leafer.export('卡片.png');
}

export function toGithub() {
  window.open('https://github.com/kooriookami/yugioh-card');
}

export function onImageChange(e) {
  const file = e.target.files[0];
  if (file) {
    form.image = URL.createObjectURL(file);
  }
}

export function selectImage() {
  fileInput.value && fileInput.value.click();
}

export function toggleArrow(val) {
  const idx = form.arrowList.indexOf(val);
  if (idx > -1) {
    form.arrowList.splice(idx, 1);
  } else {
    form.arrowList.push(val);
  }
}

export function setupLifecycle() {
  onMounted(renderCard);
  onBeforeUnmount(() => {
    cardLeaf.value?.leafer.destroy();
  });
  watch(form, renderCard, { deep: true });
}