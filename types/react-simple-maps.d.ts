declare module "react-simple-maps" {
  import type { ReactNode, CSSProperties } from "react";

  export type Coordinates = [number, number];

  export type ComposableMapProps = {
    projection?: string;
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
  };

  export function ComposableMap(props: ComposableMapProps): JSX.Element;

  export type GeographyProps = {
    geography: unknown;
    fill?: string;
    stroke?: string;
    style?: {
      default?: CSSProperties;
      hover?: CSSProperties;
      pressed?: CSSProperties;
    };
  };

  export function Geography(props: GeographyProps): JSX.Element;

  export type GeographiesProps = {
    geography: string | object;
    children: (args: { geographies: Array<{ rsmKey: string }> }) => ReactNode;
  };

  export function Geographies(props: GeographiesProps): JSX.Element;

  export type MarkerProps = {
    coordinates: Coordinates;
    children?: ReactNode;
  };

  export function Marker(props: MarkerProps): JSX.Element;
}
