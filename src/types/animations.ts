/**
 * Animation Type Definitions
 * Feature: 002-transform-the-gamr
 *
 * Types for animation configurations, easing functions, and animation utilities.
 */

/**
 * Animation type categories
 */
export enum AnimationType {
  SCROLL_TRIGGERED = 'scroll-triggered',
  HOVER = 'hover',
  LOAD = 'load',
  INTERACTION = 'interaction',
  CONTINUOUS = 'continuous', // e.g., floating animation
}

/**
 * Trigger conditions for animations
 */
export enum TriggerCondition {
  SCROLL_INTO_VIEW = 'scroll-into-view',
  HOVER = 'hover',
  CLICK = 'click',
  IMMEDIATE = 'immediate', // On mount
  IDLE = 'idle', // After user idle period
}

/**
 * Easing function type
 * Takes progress value 0-1 and returns eased value 0-1
 */
export type EasingFunction = (t: number) => number;

/**
 * Reduced motion configuration for accessibility
 */
export interface ReducedMotionConfig {
  /** If true, animation is completely disabled */
  disable: boolean;
  /** Override duration (0 for instant) */
  duration?: number;
  /** Override properties (e.g., opacity only) */
  properties?: string[];
}

/**
 * Animation configuration defining behavior settings
 */
export interface AnimationConfiguration {
  /** Unique identifier for the animation */
  name: string;
  /** Animation category */
  type: AnimationType;
  /** Animation duration in milliseconds */
  duration: number;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Timing function name or custom function */
  easing: string | EasingFunction;
  /** CSS properties to animate */
  properties: string[];
  /** When to start animation */
  trigger: TriggerCondition;
  /** Intersection Observer threshold (0-1) */
  threshold?: number;
  /** Whether animation repeats on scroll */
  triggerOnce?: boolean;
  /** Alternative behavior for reduced motion */
  reducedMotion?: ReducedMotionConfig;
  /** Force GPU acceleration (transform3d) */
  gpuAcceleration?: boolean;
}

/**
 * Transform values for CSS transforms
 */
export interface TransformValues {
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
}

/**
 * Performance metrics for animation monitoring
 */
export interface PerformanceMetrics {
  /** Frames per second */
  fps: number;
  /** Average frame time in milliseconds */
  frameTime: number;
  /** Number of dropped frames */
  dropped: number;
}
