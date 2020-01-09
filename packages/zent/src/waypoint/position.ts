export interface IWaypointBounds {
  waypointTop: number;
  waypointBottom: number;
  viewportTop: number;
  viewportBottom: number;
}

export const enum WaypointPosition {
  Above,
  Inside,
  Below,
  Invisible,
  Unknown,
}

/**
 * @param bounds An object with bounds data for the waypoint and
 *   scrollable parent
 * @returns The current position of the waypoint in relation to the
 *   visible portion of the scrollable parent.
 */
export function getCurrentPosition(bounds: IWaypointBounds): WaypointPosition {
  if (bounds.viewportBottom - bounds.viewportTop === 0) {
    return WaypointPosition.Invisible;
  }

  // top is within the viewport
  if (
    bounds.viewportTop <= bounds.waypointTop &&
    bounds.waypointTop <= bounds.viewportBottom
  ) {
    return WaypointPosition.Inside;
  }

  // bottom is within the viewport
  if (
    bounds.viewportTop <= bounds.waypointBottom &&
    bounds.waypointBottom <= bounds.viewportBottom
  ) {
    return WaypointPosition.Inside;
  }

  // top is above the viewport and bottom is below the viewport
  if (
    bounds.waypointTop <= bounds.viewportTop &&
    bounds.viewportBottom <= bounds.waypointBottom
  ) {
    return WaypointPosition.Inside;
  }

  if (bounds.viewportBottom < bounds.waypointTop) {
    return WaypointPosition.Below;
  }

  if (bounds.waypointTop < bounds.viewportTop) {
    return WaypointPosition.Above;
  }

  return WaypointPosition.Invisible;
}
