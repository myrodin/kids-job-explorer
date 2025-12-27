import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faWandMagicSparkles,
  faRocket,
  faBook,
  faClipboardList,
  faBullseye,
  faBriefcase,
  faBookOpen,
  faSearch,
  faArrowLeft,
  faArrowRight,
  faHome,
  faClockRotateLeft,
  faStar,
  faHeart,
  faLightbulb,
  faClock,
  faGraduationCap,
  faDumbbell,
  faCheck,
  faTimes,
  faTrash,
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
  faRainbow,
  faInbox,
  faTrophy,
  faCompass,
  faList,
  faSeedling,
  faLeaf,
  faTree,
  faLink,
  faPlay,
  faCircle,
  faMapMarkerAlt,
  faCertificate,
  faUserGraduate,
  faMedal,
  faBookmark,
  faExternalLinkAlt,
  faVideo,
  faCalendarAlt,
  faUsers,
  faThumbsUp,
  faQuestionCircle,
  faInfoCircle,
  faHandPointRight,
  faAngleRight,
  faCircleCheck,
  faFire,
  faGem,
  faCrown,
  faFlask,
  faPaintBrush,
  faPersonRunning,
  faMicrophone,
  faGlobe,
  faLaptopCode,
  faScrewdriverWrench,
  faBrain,
  faHeartPulse,
  faPaw,
  faSpa,
  faPalette,
  faArrowsUpDownLeftRight,
  faFont,
  faFillDrip,
  faHandPointer,
  faSquare,
  faIcons,
  faLayerGroup,
  faTableCellsLarge,
  faShareNodes,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLightbulb as faLightbulbRegular,
  faBookmark as faBookmarkRegular,
  faStar as faStarRegular,
  faHeart as faHeartRegular,
  faCircle as faCircleRegular,
} from '@fortawesome/free-regular-svg-icons';

// Icon name to definition mapping
const iconMap: Record<string, IconDefinition> = {
  // Navigation & Actions
  'wand-magic-sparkles': faWandMagicSparkles,
  'rocket': faRocket,
  'book': faBook,
  'book-open': faBookOpen,
  'clipboard-list': faClipboardList,
  'bullseye': faBullseye,
  'briefcase': faBriefcase,
  'search': faSearch,
  'arrow-left': faArrowLeft,
  'arrow-right': faArrowRight,
  'chevron-left': faChevronLeft,
  'chevron-right': faChevronRight,
  'home': faHome,
  'history': faClockRotateLeft,
  'compass': faCompass,
  'list': faList,

  // Status & Feedback
  'star': faStar,
  'star-regular': faStarRegular,
  'heart': faHeart,
  'heart-regular': faHeartRegular,
  'lightbulb': faLightbulb,
  'lightbulb-regular': faLightbulbRegular,
  'check': faCheck,
  'circle-check': faCircleCheck,
  'times': faTimes,
  'trash': faTrash,
  'sync': faArrowsRotate,
  'thumbs-up': faThumbsUp,
  'fire': faFire,
  'gem': faGem,
  'crown': faCrown,

  // Education & Work
  'clock': faClock,
  'graduation-cap': faGraduationCap,
  'user-graduate': faUserGraduate,
  'dumbbell': faDumbbell,
  'trophy': faTrophy,
  'medal': faMedal,
  'certificate': faCertificate,

  // Nature & Growth
  'rainbow': faRainbow,
  'seedling': faSeedling,
  'leaf': faLeaf,
  'tree': faTree,
  'spa': faSpa,

  // Resources
  'link': faLink,
  'external-link-alt': faExternalLinkAlt,
  'play': faPlay,
  'video': faVideo,
  'calendar-alt': faCalendarAlt,
  'map-marker-alt': faMapMarkerAlt,
  'bookmark': faBookmark,
  'bookmark-regular': faBookmarkRegular,

  // Communication & Info
  'users': faUsers,
  'question-circle': faQuestionCircle,
  'info-circle': faInfoCircle,
  'hand-point-right': faHandPointRight,
  'angle-right': faAngleRight,

  // Empty states
  'inbox': faInbox,
  'circle': faCircle,
  'circle-regular': faCircleRegular,

  // Categories
  'flask': faFlask,
  'paint-brush': faPaintBrush,
  'running': faPersonRunning,
  'microphone': faMicrophone,
  'globe': faGlobe,
  'laptop-code': faLaptopCode,
  'tools': faScrewdriverWrench,
  'brain': faBrain,
  'heart-pulse': faHeartPulse,
  'paw': faPaw,

  // Design System
  'palette': faPalette,
  'arrows-alt': faArrowsUpDownLeftRight,
  'font': faFont,
  'fill-drip': faFillDrip,
  'hand-pointer': faHandPointer,
  'square': faSquare,
  'icons': faIcons,
  'layer-group': faLayerGroup,
  'th-large': faTableCellsLarge,

  // Share
  'share': faShareNodes,
  'copy': faCopy,
};

interface IconProps {
  name: keyof typeof iconMap | string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x';
  color?: string;
  spin?: boolean;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2x': 'text-2xl',
  '3x': 'text-3xl',
};

export function Icon({ name, className = '', size = 'md', color, spin = false }: IconProps) {
  const icon = iconMap[name];

  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${sizeClasses[size]} ${color ? `text-${color}` : ''} ${className}`}
      spin={spin}
      style={color && !color.includes('-') ? { color } : undefined}
    />
  );
}

// Export commonly used icon groups for easy access (matches categories.json IDs)
export const CategoryIcons = {
  helper: 'heart-pulse',
  builder: 'tools',
  thinker: 'flask',
  artist: 'paint-brush',
  mover: 'running',
  communicator: 'microphone',
  nature: 'paw',
  tech: 'laptop-code',
} as const;

export default Icon;
