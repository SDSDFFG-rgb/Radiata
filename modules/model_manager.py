from typing import *

from huggingface_hub import HfApi, ModelFilter

from modules.logger import logger

from . import config
from .model import DiffusersModel

sd_models: List[DiffusersModel] = []
sd_model: Optional[DiffusersModel] = None
available_mode = ["diffusers"]


def get_model(model_id: str):
    model = [x for x in sd_models if x.model_id == model_id]
    if len(model) < 1:
        return None
    return model[0]


def add_model(model_id: str):
    global sd_models
    sd_models.append(DiffusersModel(model_id=model_id))
    config.set("models", [x.model_id for x in sd_models])


def set_model(model_id: str):
    global sd_model
    sd_model.teardown()

    try:
        sd_model = [x for x in sd_models if x.model_id == model_id]
        if len(sd_model) != 1:
            raise ValueError("Model not found or multiple models with same ID.")
        else:
            sd_model = sd_model[0]

        logger.info(f"Loading {sd_model.model_id}...")
        sd_model.activate()
        config.set("model", sd_model.model_id)
        logger.info(f"Loaded {sd_model.model_id}...")
    except Exception as e:
        logger.error(f"Failed to load {model_id}...")
        logger.error(e)
        set_default_model()


def search_model(model_id: str):
    api = HfApi()
    models = api.list_models(filter=ModelFilter(model_name=model_id))
    return models


def set_default_model():
    global sd_model
    prev = config.get("model")
    sd_model = [x for x in sd_models if x.model_id == prev]

    if len(sd_model) == 1:
        sd_model = sd_model[0]
    else:
        sd_model = [*sd_models][0]

    set_model(sd_model.model_id)


def init():
    raw_model_list = config.get("models") or []
    if len(raw_model_list) < 1:
        raw_model_list = config.DEFAULT_CONFIG["models"]
    for model_id in raw_model_list:
        sd_models.append(DiffusersModel(model_id=model_id))

    set_default_model()
