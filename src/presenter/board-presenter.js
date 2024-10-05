import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_SORTING_TYPE,
  SortingType,
} from '../const';
import { render } from '../framework/render';
import {
  compareByDate,
  compareByDuration,
  compareByPrice,
} from '../utils/utils';
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
  #sortComponent = null;

  #tripModel = null;

  #filterType = DEFAULT_FILTER_TYPE;
  #currentSortigType = DEFAULT_SORTING_TYPE;

  #pointPresenters = new Map();

  constructor({ boardContainer, tripModel }) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
  }

  get points() {
    switch (this.#currentSortigType) {
      case SortingType.TIME:
        return [...this.#tripModel.points].sort(compareByDuration);
      case SortingType.PRICE:
        return [...this.#tripModel.points].sort(compareByPrice);
    }
    return [...this.#tripModel.points].sort(compareByDate);
  }

  get offers() {
    return this.#tripModel.offers;
  }

  get destinations() {
    return this.#tripModel.destinations;
  }

  init() {
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.points.length) {
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
    this.#sortComponent = new SortView({
      currentSortingType: this.#currentSortigType,
      onSortingTypeChange: this.#handleSortingTypeChange,
    });
    render(this.#sortComponent, this.#boardComponent.element);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(this.points);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetViewingMode());
  };

  #handleSortingTypeChange = (sortingType) => {
    if (sortingType === this.#currentSortigType) {
      return;
    }

    this.#currentSortigType = sortingType;
    this.#clearPointList();
    this.#renderPointList();
  };
}
