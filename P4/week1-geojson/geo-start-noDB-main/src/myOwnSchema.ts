import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type Coordinate {
  latitude: Float!
  longitude:Float!
}

type Coordinates {
  coordinates: [Coordinate]
}

type Status {
  status: String
  msg: String
}

type Point {
  type: String
}

type Name {
  name: String
}

type Player {
  """Will ALWAYS have the value --> Feature <--"""
  type: String

  """userName of Player (or Team)"""
  properties: Name

  """GeoJson Point with the users location"""
  geometry: Point
}

type User {
  distance: Float
  to: String
}



type Query {

  """Returns a GeoJson Polygon representing the legal gameArea"""
  gameArea : Coordinates 

  """Check whether caller, given his latitude and lontitude, is inside the gameArea"""
  isUserInArea(latitude:Float!, longitude:Float!):Status!

  """Given callers latitude and longitude all nearby Teams will be found (inside the given radius)"""
  findNearbyPlayers(
    latitude: Float!,
    longitude: Float!,
    distance: Int!,
    ):[Player]!

  """Given callers latitude and longitude, and the userName of the Team to find, returs the distance to this Team"""
  distanceToUser(
    latitude: Float!,
    longitude: Float!,
    userName: String,
    ):User!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
