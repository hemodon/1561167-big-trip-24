import { DEFAULT_FILTER_TYPE } from '../const';
import { render } from '../framework/render';
import BoardView from '../view/board-view/board-view';
import NoPointsView from '../view/no-points-view/no-points-view';
import PointListView from '../view/point-list-view/point-list-view';
import SortView from '../view/sort-view/sort-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #boardContainer = null;

  #boardComponent = new BoardView();
  #pointListComponent = new PointListView();
  #noPointsComponent = null;
  #sortComponent = new SortView();

  #tripModel = null;
  #boardPoints = [];
  #offers = [];
  #destinations = [];

  #filterType = DEFAULT_FILTER_TYPE;

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#boardPoints = [...this.#tripModel.points];
    this.#offers = this.#tripModel.offers;
    this.#destinations = this.#tripModel.destinations;

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#boardPoints.length) {
      this.#renderNoPoints({ filterType: this.#filterType });
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }

  #renderNoPoints() {
    this.#noPointsComponent = new NoPointsView({
      filterType: this.#filterType,
    });
    render(this.#noPointsComponent, this.#boardComponent.element);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(this.#boardPoints);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    pointPresenter.init(point);
  }
}
