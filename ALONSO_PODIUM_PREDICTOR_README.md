# Fernando Alonso Podium Predictor

A machine learning model that predicts the probability of Fernando Alonso achieving a podium finish (Top 3) in Formula 1 races using the FastF1 API.

## Overview

This project uses historical F1 race data to train multiple machine learning models that can predict the likelihood of Fernando Alonso finishing on the podium in upcoming races. The model considers various factors including qualifying position, recent form, team performance, and track characteristics.

## Features

- **Real-time Data Collection**: Uses FastF1 API to fetch the latest F1 race data
- **Comprehensive Feature Engineering**: Creates intelligent features like recent form, grid position gains, and track experience
- **Multiple ML Models**: Compares Logistic Regression, Random Forest, Gradient Boosting, and XGBoost
- **Probability Predictions**: Provides percentage probability of podium finish for different scenarios
- **Interactive Visualizations**: Includes charts for EDA, model evaluation, and predictions

## Installation

1. Clone this repository
2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Requirements

- Python 3.8+
- fastf1 >= 3.0.0
- pandas >= 1.5.0
- numpy >= 1.23.0
- scikit-learn >= 1.2.0
- xgboost >= 1.7.0
- matplotlib >= 3.6.0
- seaborn >= 0.12.0
- jupyter >= 1.0.0

## Usage

### Running the Notebook

Open and run the Jupyter notebook:

```bash
jupyter notebook Alonso_Podium_Predictor.ipynb
```

The notebook includes:
1. Data collection from FastF1 API
2. Exploratory Data Analysis
3. Feature Engineering
4. Model Training and Evaluation
5. Prediction functionality

### Quick Prediction

After running the notebook, you can predict podium probability:

```python
# Predict for qualifying position P5 with average recent form
predict_next_race(qualifying_position=5)
```

### Custom Prediction

For more control over prediction parameters:

```python
probability = predict_podium_probability(
    model=best_model,
    scaler=scaler,
    quali_position=3,
    recent_podiums=0.33,  # 1 podium in last 3 races
    recent_avg_position=6.0,
    season_progress=0.5,  # Mid-season
    track_experience=5,
    year=2024
)

print(f"Podium probability: {probability:.1f}%")
```

## Model Features

The model uses the following features to make predictions:

1. **Qualifying Position**: Starting position after qualifying
2. **Grid Position**: Actual starting grid position (may differ due to penalties)
3. **Recent Podiums**: Podium rate in last 3 races
4. **Recent Average Position**: Average finish position in last 3 races
5. **Front Row Start**: Binary flag for P1 or P2 start
6. **Top 5 Start**: Binary flag for top 5 qualifying
7. **Top 10 Start**: Binary flag for top 10 qualifying
8. **Season Progress**: How far into the season (0.0 to 1.0)
9. **Track Experience**: Number of previous races at the circuit
10. **Team**: Team encoding
11. **Year**: Current season

## Model Performance

The model is trained on data from 2021-2024 and evaluated using:
- Cross-validation scores
- ROC AUC
- Precision and Recall
- Confusion Matrix

The best performing model is automatically selected based on cross-validation performance.

## Key Insights

1. **Qualifying is Critical**: Qualifying position is the strongest predictor of podium finish
2. **Recent Form Matters**: Performance in the last 3 races significantly affects predictions
3. **Top 5 Starts**: Starting in the top 5 dramatically increases podium probability
4. **Track Experience**: Familiarity with a circuit provides a small advantage

## Example Predictions

| Scenario | Qualifying | Recent Form | Podium Probability |
|----------|------------|-------------|-------------------|
| Best Case | P1 | Excellent | ~85-95% |
| Strong Qualifying | P3 | Good | ~60-75% |
| Mid-field Start | P8 | Average | ~20-35% |
| Poor Qualifying | P12 | Below Avg | ~5-15% |

## Data Collection

The project collects data for Fernando Alonso from:
- 2021 season: Alpine F1 Team
- 2022-2024 seasons: Aston Martin F1 Team

Data includes:
- Race results
- Qualifying results
- Grid positions
- Points scored
- Race status (finished, DNF, etc.)

## Future Improvements

Potential enhancements for the model:

- Weather conditions (wet/dry races)
- Competitor strength metrics
- Tire strategy predictions
- Safety car probability
- Circuit characteristics (overtaking difficulty, street circuit vs. permanent)
- Sprint race format considerations
- Car upgrade cycles

## Files Generated

When you run the notebook, the following files will be created:

- `alonso_race_data.csv`: Raw race data collected from FastF1
- `alonso_podium_model.pkl`: Trained ML model
- `feature_scaler.pkl`: Fitted StandardScaler for feature scaling
- `alonso_eda.png`: Exploratory data analysis visualizations
- `model_evaluation.png`: Model performance metrics
- `feature_importance.png`: Feature importance chart
- `podium_probability_curve.png`: Probability vs qualifying position

## License

This project is for educational and analytical purposes. F1 data is provided by the FastF1 API.

## Acknowledgments

- FastF1 API for providing comprehensive F1 data
- The F1 community for inspiration
- Fernando Alonso for being an incredible driver to analyze!

## Contributing

Feel free to fork this project and adapt it for other drivers or racing series!

## Contact

For questions or suggestions, please open an issue on the repository.

---

**Note**: This model provides probability estimates based on historical data and should be used for entertainment and analytical purposes. Actual race results depend on many unpredictable factors including race incidents, mechanical failures, weather changes, and strategic decisions.
